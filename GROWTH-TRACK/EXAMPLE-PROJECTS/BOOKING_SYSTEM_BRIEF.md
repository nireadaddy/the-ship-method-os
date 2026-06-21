# TimeSlot — Booking & Scheduling for Independent Service Providers

## Idea
TimeSlot is a lightweight booking system built for solo tutors, massage therapists, coaches, and other independent service providers who need clients to book and pay for appointments online without the overhead of enterprise scheduling software.

## Problem
Independent providers juggle bookings across text messages, DMs, and paper calendars. Double-bookings, no-shows, and manual payment chasing eat hours every week — time that should go to billable sessions, not admin.

## Target User
Solo service providers (tutors, therapists, personal trainers, hairstylists) running 5-40 appointments/week, mostly non-technical, currently using Calendly's free tier, Instagram DMs, or a paper notebook to manage their schedule.

## Revenue Model
Monthly SaaS subscription ($15-29/mo per provider), with an optional add-on fee for payment processing (small % on top of Stripe fees) for providers who collect deposits or full payment at booking.

## MVP Features
- Public booking page with provider's available time slots, synced to their working hours
- Client self-booking flow with email/SMS confirmation and reminder
- Calendar view (day/week) showing all upcoming appointments
- Manual block-off for vacations/unavailable times
- Optional deposit/payment collection at booking via Stripe
- No-show and cancellation tracking with configurable policy text

## Human Flow
1. Provider sets up availability (working hours, session length, buffer time)
2. Provider shares their public booking link with clients
3. Client picks an open slot and enters contact info (+ pays deposit if required)
4. System sends confirmation + reminder emails/SMS to both parties
5. Provider sees the appointment on their calendar dashboard
6. Provider marks the session complete or no-show after it happens

## AI Instructions
Build a Next.js + Supabase app called TimeSlot for independent service providers to manage bookings. Core entities: Provider (working hours, session length, buffer time), Service (name, duration, price), Appointment (belongs to Provider, fields: client_name, client_contact, start_time, status enum [booked, completed, no_show, cancelled]), Availability (recurring weekly schedule with overrides for specific dates). Build a public booking page that computes open slots by subtracting existing Appointments from Availability, a Stripe Checkout flow for optional deposits, and a provider dashboard calendar view with day/week toggle. Use Supabase RLS so each provider only sees their own appointments.
