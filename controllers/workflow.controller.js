import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { serve } = require('@upstash/workflow/express')
import dayjs from 'dayjs'
import Subscription from '../models/subscription.model.js'

const REMINDERS = [7, 4, 1]

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload
  const subscription = await fetchSubscription(context, subscriptionId)

  // Do not send the reminder if the subscription is not present or not active
  if(!subscription || subscription.status !== 'active') return

  // We could use regular JS date object => new Date(subscription.renewalDate), but we have to do a bit more date and time calculations so for that we are going to use dayjs
  const renewalDate = dayjs(subscription.renewalDate);
  if(renewalDate.isBefore(dayjs())){ // dayjs -> return current date and time
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping Workflow.`);
    return;
  }

  for (const daysBefore of REMINDERS){
    const reminderDate = renewalDate.subtract(daysBefore, 'day')
    // If renewal date = 28 Aug, reminderDate = 21, 24, 27

    if(reminderDate.isAfter(dayjs())){ // Checks if the reminder date is in the future compared to the current date/time.
      await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate)
    }

    await triggerReminder(context, `Reminder ${daysBefore} days before`)
  }
})

const fetchSubscription = async(context, subscriptionId) => {
  return await context.run('get subscription', async () => {
    return Subscription.findById(subscriptionId).populate('user', 'name email') // Populating with 'user' information specifically 'name' and 'email'
  })
}

const sleepUntilReminder = async(context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async(context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`)
    // Send email, SMS, push notification...
  })
}