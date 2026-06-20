
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://cbhomuatxxptfcbzveys.supabase.co";

const supabaseKey =
  "COLLE_ICI_TA_PUBLISHABLE_KEY";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
