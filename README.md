# Gaza Connect

إليك برومبت احترافي مخصص لـ Lovable. صغته بطريقة تجعل Lovable يركز على إنشاء الواجهة الأمامية فقط باستخدام HTML + Tailwind CSS + Vanilla JavaScript (DOM)، دون إنشاء Backend أو React أو أي Framework.

Prompt

You are a senior Frontend Engineer and UI/UX Designer.

Your task is to build ONLY the Frontend of a modern web application called:

Gaza Barter Platform (منصة مقايضة الخدمات والسلع)

The application allows people in the Gaza Strip to exchange services and goods instead of using money.

IMPORTANT

Build Frontend ONLY.

Do NOT build:

Backend

Database

Authentication server

Express

Node backend

Firebase

Supabase

Laravel

React

Vue

Angular

Use only:

HTML5

Tailwind CSS

Vanilla JavaScript (DOM Manipulation)

Fetch API (mock only)

LocalStorage

SessionStorage

Do NOT use React or JSX.

The code must be clean, modular and production-quality.

Design Style

Create a modern interface inspired by:

Facebook Marketplace

Facebook Groups

Nextdoor

Reddit

LinkedIn Feed

Style:

Modern

Clean

Soft UI

Glassmorphism where appropriate

Rounded cards

Beautiful shadows

Smooth animations

Excellent spacing

Primary color

#075E66

Secondary colors

White

Light Gray

Green

Blue

Responsive Design

The entire website must be fully responsive.

Mobile First.

Support:

Mobile

Tablet

Laptop

Desktop

Requirements

Responsive Navbar

Hamburger menu

Responsive Sidebar

Responsive Cards

Responsive Forms

Responsive Map

Responsive Chat

Responsive Dashboard

No horizontal scrolling.

Project Idea

The Gaza Strip is divided into neighborhoods.

Each user belongs to one neighborhood.

After login, users can:

Exchange services

Exchange goods

Create barter posts

Browse neighborhood posts

Browse public posts from all neighborhoods

Neighborhoods

Create sample neighborhoods like:

الرمال

الشجاعية

تل الهوى

الشيخ رضوان

الزيتون

النصر

التفاح

جباليا

بيت لاهيا

بيت حانون

دير البلح

خان يونس

رفح

Authentication UI

Create only UI.

Pages:

Login

Register

Forgot Password

Verification

No real authentication.

Use mock data only.

Home Page

Split into two sections.

Neighborhood Feed

Displays posts from the user's neighborhood.

Example:

User from Al-Rimal sees only Al-Rimal posts.

Public Feed

Displays posts from all neighborhoods.

Each post shows:

Neighborhood name

Neighborhood badge

Distance (mock)

Map location

Types of Posts

Create two post types.

Offer

Example

I provide

Phone charging service

I need

Flour

Rice

Sugar

Request

Example

I need

Phone repair

I offer

Cooking oil

Blankets

Post Card

Every post should contain

Profile image

User name

Neighborhood

Time

Title

Description

Images

Tags

Category

Offer Items

Wanted Items

Location

Status

Views

Likes

Comments

Shares

Buttons

Like

Comment

Share

Save

Report

Barter Now

Create Post Page

Beautiful form.

Fields

Post Type

Title

Description

Category

Offer Items

Wanted Items

Images

Visibility

Neighborhood Only

Public

Location

Submit Button

Comments

Each post contains

Nested comments

Replies

Like comment

Edit comment

Delete comment

Image attachment

Mock functionality only.

Barter Request Modal

When clicking

Barter Now

Open modal.

Fields

What will you offer?

What do you need?

Message

Send

Mock only.

Search

Global search.

Search by

Goods

Services

Users

Neighborhood

Tags

Filters

Neighborhood

Category

Service

Goods

Newest

Nearest

Most Popular

Notifications UI

Create beautiful notifications page.

Examples

New comment

New barter request

Accepted

Rejected

Message

Chat UI

Messenger style.

Conversations

Typing indicator

Read status

Image message

Location message

Mock data only.

Profile

Profile page.

Contains

Avatar

Cover

Bio

Neighborhood

Rating

Posts

Completed Barters

Reviews

Services

Goods

Map Page

Create interactive map UI using Leaflet.

Mock markers only.

Each marker opens popup.

Popup contains

Image

Title

Neighborhood

Offer

Button

Open Post

Admin Dashboard UI

Only UI.

Pages

Dashboard

Users

Posts

Reports

Categories

Neighborhoods

Statistics

Beautiful charts using dummy data.

Navigation

Responsive Navbar

Responsive Sidebar

Footer

Breadcrumb

Components

Create reusable components.

Navbar

Sidebar

Post Card

Comment

Modal

Button

Badge

Avatar

Search Bar

Notification Item

Chat Bubble

Profile Card

Statistics Card

Map Card

JavaScript

Use only Vanilla JavaScript.

Must use

DOM Manipulation

Event Delegation

Modules

Fetch API (Mock)

LocalStorage

SessionStorage

Async Await

No jQuery.

Mock API

Create mock JSON files.

users.json

posts.json

comments.json

notifications.json

messages.json

categories.json

neighborhoods.json

Use Fetch API to read them.

Folder Structure

project/
│
├── index.html
├── login.html
├── register.html
├── profile.html
├── map.html
├── create-post.html
├── admin.html
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── json/
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── api.js
│   ├── auth.js
│   ├── posts.js
│   ├── comments.js
│   ├── map.js
│   ├── notifications.js
│   ├── messages.js
│   ├── storage.js
│   └── utils.js
│
└── README.md


Output Requirements

Generate only the Frontend.

Use HTML + Tailwind CSS + Vanilla JavaScript only.

Do NOT use React, JSX, TypeScript, or any frontend framework.

Use reusable components and clean architecture.

Ensure every page is fully responsive and production-ready.

Build all pages with mock data so the interface feels like a complete working application.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://connect-gaza.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2e692f7b-e149-4c9f-8b0e-068567017d98).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
