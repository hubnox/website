# Hubnox Website

Event discovery and ticket purchasing platform built with React + TypeScript + Vite.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit with RTK Query
- **Backend**: Parse Server (BaaS)
- **Payments**: Stripe
- **Feature Flags**: ConfigCat

## Project Structure

```
/src
├── /app                    # Redux store, API slices, typed hooks
│   ├── store.ts           # Redux store configuration
│   ├── hooks.ts           # useAppDispatch, useAppSelector
│   ├── apiSlice.ts        # Base RTK Query API (events, creators, discounts)
│   ├── eventsApi.ts       # Event and ticket endpoints
│   ├── creatorsApi.ts     # Creator endpoints
│   └── paymentApi.ts      # Stripe payment endpoints
├── /components
│   ├── /Ticket            # Multi-step ticket purchase flow
│   │   ├── TicketModal.tsx      # Orchestrates 3-step flow
│   │   ├── TicketStep1.tsx      # Email collection
│   │   ├── TicketStep2.tsx      # Ticket type selection
│   │   ├── TicketStep3.tsx      # Quantity, discounts, checkout
│   │   ├── PaymentModal.tsx     # Stripe card input
│   │   ├── PaymentResultModal.tsx # Success/error display
│   │   └── stripe.ts            # Stripe initialization
│   ├── Header.tsx         # Navigation bar
│   ├── Footer.tsx         # Footer section
│   ├── Slider.tsx         # Event carousel (Swiper)
│   ├── EventSlide.tsx     # Event card component
│   ├── CreatorSlider.tsx  # Creator carousel
│   └── CreatorSlide.tsx   # Creator card component
├── /config
│   └── configCatClient.ts # Feature flag client
├── /data
│   └── sampleData.ts      # Fallback data when API unavailable
├── /hooks
│   └── useFees.ts         # Fetches fee percentages from ConfigCat
├── /pages
│   ├── Home.tsx           # Landing page with events, creators, features
│   ├── EventDetails.tsx   # Event page with ticket modal
│   ├── Privacy.tsx        # Privacy policy
│   └── Terms.tsx          # Terms and conditions
├── /types
│   └── home-type.ts       # TypeScript definitions (Event, Creator, Ticket, Discount)
├── /assets                # Images and icons
├── /styles                # CSS files
├── App.tsx                # Main app with routing setup
└── main.tsx               # React entry point
```

## Routing

Uses React Router v6 with HashRouter:

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with event/creator carousels |
| `/event/:eventId` | EventDetails | Event info with ticket purchase modal |
| `/privacy` | Privacy | Privacy policy |
| `/terms` | Terms | Terms and conditions |

## State Management

Redux Toolkit with RTK Query for API caching:

- **apiSlice.ts**: Base API with Parse Server auth headers
- **eventsApi.ts**: `getEvents()`, `getTicketsByEventId()`
- **creatorsApi.ts**: `getCreators()`
- **paymentApi.ts**: `createPaymentIntent()`, `saveUserTicketAfterPayment()`

All API calls include fallback to sample data on failure.

## Data Models

### Event
```typescript
{
  objectId, name, description, thumbnail, location,
  startDateAndTime, endDateAndTime, creator, creatorId,
  isFeaturedEvent, isCancelled, additionalImage1/2/3
}
```

### Creator
```typescript
{
  objectId, firstName, lastName, aboutMe, tagLine,
  isShowOnWeb, instagramLink, image
}
```

### Ticket
```typescript
{
  id, title, price, amount, currencyType
}
```

### Discount
```typescript
{
  objectId, discountCode, discountName,
  amountType ("percent" | "fixed"), amount,
  startDateAndTime, finishDateAndTime,
  maxNumberOfTickets, ticketTypesIds
}
```

## Key Business Logic

### Event Filtering (Slider.tsx)
1. Only show events from visible creators (`isShowOnWeb: true`)
2. Only show future events
3. Limit to 2 events per creator when multiple creators exist
4. Sort by start date ascending

### Ticket Purchase Flow
1. **Step 1**: Collect user email
2. **Step 2**: Select ticket type from available options
3. **Step 3**: Choose quantity, apply discount code, view price breakdown
4. **Payment**: Enter card details via Stripe Elements
5. **Result**: Show success/failure, save ticket record

### Discount Validation
- Check code exists and not deleted
- Verify within valid date range
- Verify applicable to selected ticket type
- Verify quantity doesn't exceed max allowed
- Calculate discount (percent or fixed)

### Fee Calculation
Fees loaded from ConfigCat at runtime:
- `platformFee`: Platform service fee percentage
- `paymentFee`: Payment processing fee percentage

## Environment Variables

```
VITE_PARSE_SERVER_URL=https://your-parse-server.com/parse
VITE_PARSE_APP_ID=your-app-id
VITE_PARSE_JS_KEY=your-javascript-key
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

## Commands

```bash
npm run dev      # Start development server
npm run build    # TypeScript check + production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run deploy   # Deploy to GitHub Pages
```

## Parse Server Endpoints

### REST API
- `GET /classes/Events` - Fetch events
- `GET /classes/_User` - Fetch creators
- `GET /classes/Discounts` - Fetch discount by code

### Cloud Functions
- `POST /functions/getTicketsByEventId` - Get tickets for event
- `POST /functions/createPaymentIntent` - Create Stripe payment intent
- `POST /functions/saveUserTicketAfterPayment` - Record ticket purchase

## Tailwind Breakpoints

| Name | Width |
|------|-------|
| `l` | 650px |
| `sm` | 750px |
| `md` | 900px |
| `blg` | 1070px |
