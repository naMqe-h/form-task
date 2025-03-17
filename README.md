# Workout Registration Application

## Project Structure

- `src/components/` - user interface components
    - `FileInput.tsx` - component for uploading photos
    - `Slider.tsx` - age selection slider
    - `TextField.tsx` - form text fields
    - `DateInput.tsx` - date and time selection component
- `src/hooks/` - React hooks
    - `useForm.ts` - form state management and validation
    - `useDate.tsx` - logic for date and time selection

## API

The application uses the following APIs:

- `http://letsworkout.pl/submit` - endpoint for submitting registration form data
- `https://api.api-ninjas.com/v1/holidays` - API for retrieving holidays and days off 