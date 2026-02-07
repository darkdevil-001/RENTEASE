🏠 RentEase

Preference-Based Room & Roommate Finder with Trust Layers

📌 Overview

RentEase is a web application designed to simplify the process of finding rooms, roommates, and shared living spaces.
It focuses on preference-based matching, group room sharing, and basic trust mechanisms, while keeping the platform simple, privacy-friendly, and easy to use.

The application supports both:

People searching for rooms

Room owners listing available or partially occupied rooms

🎯 Problem Statement

Finding a room or compatible roommates is often difficult due to:

Lack of structured filtering

Poor roommate compatibility

Unclear occupancy details

Limited trust between users

RentEase addresses these issues by enabling preference-based discovery, shared room visibility, and clear occupancy information.

🚀 Key Features
🔍 Find a Room

Users can search for rooms based on:

Preferred location

Budget range

Room type (Private / Shared)

Payment type (Rent / Lease / Rent + Lease)

Move-in date

Lifestyle preferences

Search results update dynamically without altering the existing UI flow.

🏠 List a Room

Room owners can list:

Fully vacant rooms

Partially occupied rooms (rooms that already have members but still have space)

Additional details for partially occupied rooms:

Total room capacity (2–6 members)

Current members present

Available slots (auto-calculated)

Existing members’ lifestyle preferences

All listing details are editable from the dashboard.

👥 Roommate Groups

Users can form or join roommate groups with shared features such as:

Group visibility

Preference matching

Member count display

📝 Monthly To-Do & Expense Split

Each group includes a monthly to-do list:

Rent

Electricity bill

Water bill

Internet

Custom expenses

Each item:

Stores total amount

Splits cost equally among members

Supports edit and delete actions

🔐 Basic Trust & Verification

Optional identity verification using:

Driving License number OR

Voter ID number

Format validation only

No document uploads or storage

Verification status shown as a trust indicator

👤 Profile Management

Clicking the user name (top-right corner) opens profile settings

Users can update:

Name

Email

Phone number

Basic preferences

Updates do not affect login state

🛠️ Technical Details

Platform: Wix Studio

Logic: Client-side (Velo)

Data Storage:

Wix Data Collections OR

LocalStorage (for demo/hackathon use)

Responsive design

Clean, modular, and maintainable codebase

🔒 Privacy & Safety

No sensitive document storage

No payment handling

No backend authentication dependency

Users exchange documents outside the platform

📦 Out of Scope (Future Enhancements)

In-app chat

Payment integration

Advanced verification

Admin moderation

Real backend authentication

🧪 Project Status

Functional prototype

UI and core flows completed

Feature-extended without redesign

Suitable for hackathons, demos, and concept validation

📄 License

This project is intended for educational, demo, and hackathon purposes.
