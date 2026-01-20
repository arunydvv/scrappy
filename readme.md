# Scrappy

Scrappy is a visual, AI-powered web scraping SaaS that allows users to design, schedule, and monitor automated scraping workflows without writing code. It combines a drag-and-drop workflow builder with browser automation, AI extraction, secure credential handling, and usage-based billing.

---

## 🚀 What is Scrappy?

Scrappy enables users to **build scrapers visually** by connecting task nodes (browser actions, data extraction, AI processing) into workflows that can run automatically on a schedule. It is designed to be **self-running, scalable, and production-ready**, making it suitable for both technical and non-technical users.

---

## ✨ Core Features

### Visual Workflow Builder

* Drag-and-drop workflow editor built with React Flow
* Node-based tasks such as:

  * Launch browser
  * Navigate to URL
  * Extract HTML / text
  * Click buttons, fill forms
  * AI-powered data extraction
* Typed inputs and outputs with validation
* Real-time workflow validation before execution

### Workflow Execution Engine

* Automatically generates execution plans based on graph dependencies
* Executes workflows in sequential phases
* Tracks node-level inputs, outputs, and execution state
* Handles failures gracefully with detailed logs

### AI-Powered Scraping

* Uses OpenAI (GPT-4) for intelligent selector generation and data extraction
* Reduces manual selector maintenance
* Enables structured data extraction from complex pages

### Credential Management

* Secure storage of secrets (passwords, API keys)
* AES-256 encryption for sensitive values
* Credentials can be injected into workflows as typed inputs
* Secrets are never exposed in plaintext

### Scheduling

* CRON-based scheduling for automated runs
* Human-readable schedule descriptions
* Ability to add, update, or remove schedules
* Backend scheduler triggers workflows automatically

### Execution Monitoring

* Live execution viewer
* Phase-by-phase logs
* Execution duration tracking
* Credit usage per run
* Success and failure status indicators

### Billing & Credits

* Usage-based credit system
* Stripe integration for purchasing credits
* Multiple credit packages
* Payment history and downloadable invoices
* Stripe webhooks for automatic credit updates

### Authentication & Security

* Secure authentication using Clerk
* User-isolated workflows and executions
* Protected routes and session management

---

## 🧱 Tech Stack

**Frontend**

* Next.js
* TypeScript
* React
* React Flow
* Tailwind CSS

**Backend**

* Next.js API Routes
* Prisma ORM
* PostgreSQL

**Automation & AI**

* Puppeteer
* OpenAI GPT-4

**Auth & Payments**

* Clerk (Authentication)
* Stripe (Billing & Invoices)

---

## 📊 Platform Capabilities

* Multi-workflow management per user
* Execution statistics and usage charts
* Credit consumption tracking
* Dark mode and responsive UI
* Desktop and mobile-friendly navigation

---

## 🎯 Use Cases

* Web data extraction at scale
* Monitoring price changes or content updates
* Lead generation and data aggregation
* Automating repetitive browser tasks
* Building scraping pipelines without code

---

## 📦 Getting Started (High-Level)

1. Sign up and receive initial credits
2. Create credentials (if needed)
3. Build a workflow using the visual editor
4. Validate and run the workflow
5. Optionally schedule it using CRON
6. Monitor executions and logs

---

## 🧠 Design Philosophy

Scrappy is designed to be:

* **Visual** – workflows are easy to understand and modify
* **Autonomous** – once configured, it runs without babysitting
* **Secure** – secrets and user data are fully isolated
* **Scalable** – execution and billing designed for SaaS growth

---

## 📄 License

This project is intended for educational and portfolio purposes. Licensing terms can be added as needed.

---

## 👤 Author

Built by Arun Yadav as a full-stack SaaS and automation project.
