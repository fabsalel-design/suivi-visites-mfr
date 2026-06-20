
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://cbhomuatxxptfcbzveys.supabase.co";

const supabaseKey =
  "sb_publishable_4vPEKeE_FYXBu6jm_YvlHw_zKUR_aNz";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
