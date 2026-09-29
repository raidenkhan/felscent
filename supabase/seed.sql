-- FELSCENT — seed data: the twelve fragrances.
-- Run AFTER supabase/schema.sql, in: Supabase Dashboard → SQL Editor → New query.
--
-- Re-running is safe: rows are matched on slug. Content columns (name, copy,
-- price, notes, imagery) are refreshed, but stock_quantity, low_stock_threshold
-- and published are left exactly as the admin panel has them.

insert into public.products as p
  (slug, name, fragrance_type, size_ml, price_cents, currency, short_description,
   stock_quantity, low_stock_threshold, published, images, top_notes, heart_notes, base_notes)
values
  ('barakat', 'Barakat', 'Extrait de parfum', 100, 4200, 'GHS',
   'Saffron-warm and quietly sweet — jasmine over amberwood, closer to a whisper than a statement.',
   12, 5, true,
   array['/products/barakat.jpg'],
   array['Saffron', 'Bitter almond'],
   array['Jasmine', 'Cedar'],
   array['Amberwood', 'Musk']),

  ('brown-orchid', 'Brown Orchid', 'Eau de parfum', 100, 3600, 'GHS',
   'Black currant and truffle over dark woods — a rich, earthy orchid with weight to it.',
   15, 5, true,
   array['/products/brown-orchid.jpg'],
   array['Black currant', 'Truffle', 'Bergamot'],
   array['Ylang-ylang', 'Lotus wood', 'Jasmine'],
   array['Patchouli', 'Sandalwood', 'Dark chocolate', 'Frankincense']),

  ('cocktail-intense', 'Cocktail Intense', 'Eau de parfum', 100, 3800, 'GHS',
   'Cognac, cinnamon and oak — a boozy gourmand that reads warm rather than sweet.',
   15, 5, true,
   array['/products/cocktail-intense.jpg'],
   array['Cognac', 'Bergamot'],
   array['Cinnamon', 'Tonka bean', 'Oak'],
   array['Vanilla', 'Sandalwood', 'Praline']),

  ('liquid-brun', 'Liquid Brun', 'Eau de parfum', 100, 4500, 'GHS',
   'Cinnamon and cardamom folding into bourbon vanilla and praline — the evening scent that lingers.',
   15, 5, true,
   array['/products/liquid-brun.jpg'],
   array['Cinnamon', 'Cardamom', 'Orange blossom', 'Bergamot'],
   array['Bourbon vanilla', 'Elemi'],
   array['Praline', 'Musk', 'Ambroxan', 'Guaiac wood']),

  ('matelot', 'Matelot', 'Eau de parfum', 100, 3400, 'GHS',
   'Saffron and cardamom over guaiac wood and leather — dry, aromatic, quietly masculine.',
   15, 5, true,
   array['/products/matelot.jpg'],
   array['Cardamom', 'Saffron'],
   array['Lily of the valley'],
   array['Guaiac wood', 'Oud', 'Patchouli', 'Leather']),

  ('oniro', 'Oniro', 'Eau de parfum', 100, 3600, 'GHS',
   'Grapefruit and sea salt over ambergris and oakmoss — daylight on a cold shore.',
   15, 5, true,
   array['/products/oniro.jpg'],
   array['Sea notes', 'Grapefruit', 'Mandarin'],
   array['Bay leaf', 'Jasmine'],
   array['Ambergris', 'Guaiac wood', 'Oakmoss', 'Patchouli']),

  ('oud-de-arabia', 'Oud de Arabia', 'Eau de parfum', 100, 3800, 'GHS',
   'Warm spice and soft florals over deep resins — a classical oud, worn close and elegant.',
   15, 5, true,
   array['/products/oud-de-arabia.jpg'],
   array['Warm spices'],
   array['Rose', 'Soft florals'],
   array['Oud', 'Woods', 'Amber', 'Musk']),

  ('oud-madness', 'Oud Madness', 'Eau de parfum', 60, 5800, 'GHS',
   'Passion fruit against saffron and Turkish rose — a dark fruity oud with a smoky leather trail.',
   3, 5, true,
   array['/products/oud-madness.jpg'],
   array['Passion fruit', 'Saffron', 'Turkish rose'],
   array['Oud', 'Indonesian patchouli', 'Benzoin'],
   array['Leather', 'Oakmoss', 'Amber', 'Vanilla']),

  ('ramz-lattafa', 'Ramz Silver', 'Eau de parfum', 100, 3200, 'GHS',
   'Pear and lavender brightening into vanilla and amber — sweet, lifted, easy to live with.',
   15, 5, true,
   array['/products/ramz-lattafa.jpg'],
   array['Pear', 'Lavender', 'Bergamot', 'Mint'],
   array['Cardamom', 'Sage'],
   array['Vanilla', 'Amber', 'Musk', 'Patchouli']),

  ('suits', 'Suits', 'Eau de parfum', 100, 4000, 'GHS',
   'Ginger and lavender pressed against leather and vanilla — tailored, warm, composed.',
   15, 5, true,
   array['/products/suits.jpg'],
   array['Ginger', 'Lavender', 'Ozonic notes'],
   array['Rose', 'Violet leaf', 'Resins'],
   array['Leather', 'Patchouli', 'Amber', 'Vanilla']),

  ('suspenso', 'Suspenso', 'Eau de parfum', 100, 3600, 'GHS',
   'Lavender and water notes over tobacco leaf and amber — cool mornings, warm evenings.',
   15, 5, true,
   array['/products/suspenso.jpg'],
   array['Water notes', 'Lavender', 'Basil', 'Geranium'],
   array['Sage', 'Tobacco leaf', 'Hay'],
   array['Sandalwood', 'Labdanum', 'Cypress', 'Amber', 'Musk']),

  ('zara', 'Zara Vibrant Leather', 'Eau de parfum', 120, 2800, 'GHS',
   'Pineapple brightness over dry birch and leather — the opening that gets asked about.',
   15, 5, true,
   array['/products/zara.jpg'],
   array['Pineapple', 'Bergamot', 'Citrus'],
   array['Violet', 'Jasmine'],
   array['Leather', 'Birch', 'Amberwood', 'Musk'])

on conflict (slug) do update set
  name               = excluded.name,
  fragrance_type     = excluded.fragrance_type,
  size_ml            = excluded.size_ml,
  price_cents        = excluded.price_cents,
  currency           = excluded.currency,
  short_description  = excluded.short_description,
  images             = excluded.images,
  top_notes          = excluded.top_notes,
  heart_notes        = excluded.heart_notes,
  base_notes         = excluded.base_notes;
