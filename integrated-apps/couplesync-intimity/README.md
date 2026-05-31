**Welcome to your Base44 project**

**About**

View and Edit  your app on [Base44.com](http://Base44.com)

This project contains everything you need to run your app locally.

**Edit the code in your local development environment**

Any change pushed to the repo will also be reflected in the Base44 Builder.

**Prerequisites:**

1. Clone the repository using the project's Git URL
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create an `.env.local` file and set the right environment variables

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url

e.g.
VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
VITE_BASE44_APP_BASE_URL=https://my-to-do-list-81bfaad7.base44.app
```

Run the app: `npm run dev`

**Publish your changes**

Open [Base44.com](http://Base44.com) and click on Publish.

**Docs & Support**

Documentation: [https://docs.base44.com/Integrations/Using-GitHub](https://docs.base44.com/Integrations/Using-GitHub)

Support: [https://app.base44.com/support](https://app.base44.com/support)

---

## Supabase migration layer

The repository also contains an additive Supabase migration layer. The original Base44 files and dependencies are retained for reference and compatibility while the application runtime is moved to Supabase.

1. Create a Supabase project.
2. Run `supabase/migrations/20260530233000_initial_schema.sql`.
3. Copy `.env.example` to `.env.local` and fill in the Supabase values.
4. Validate the bundled source data:

```powershell
npm run validate:taxonomy
```

5. Import the bundled taxonomy:

```powershell
$env:VITE_SUPABASE_URL="https://your-project.supabase.co"
$env:SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
npm run import:taxonomy
```

The complete input bundle is preserved in `data/source`. Runtime JSON extracts used by the questionnaire generator are stored in `src/lib/data/generated`.

### Privacy model

- Session creation and joining use database RPC functions.
- Full responses remain readable only by their author.
- Pair comparison exposes only whitelisted comparable answers.
- Free-text notes, conditions, and boundaries are not automatically shared with the partner.
- Pairing is based on `partner_slot`, not gender.
