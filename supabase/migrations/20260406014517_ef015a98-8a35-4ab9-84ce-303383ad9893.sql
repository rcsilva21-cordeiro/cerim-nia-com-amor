-- Create weddings table
CREATE TABLE public.weddings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  cover_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create wedding_photos table
CREATE TABLE public.wedding_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  names TEXT NOT NULL,
  detail TEXT,
  quote TEXT NOT NULL,
  wedding_id UUID REFERENCES public.weddings(id),
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Weddings policies
CREATE POLICY "Public can view weddings" ON public.weddings FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert weddings" ON public.weddings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update weddings" ON public.weddings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete weddings" ON public.weddings FOR DELETE TO authenticated USING (true);

-- Wedding photos policies
CREATE POLICY "Public can view wedding photos" ON public.wedding_photos FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert wedding photos" ON public.wedding_photos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update wedding photos" ON public.wedding_photos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete wedding photos" ON public.wedding_photos FOR DELETE TO authenticated USING (true);

-- Testimonials policies
CREATE POLICY "Public can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (true);

-- Create gallery storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Storage policies for gallery bucket
CREATE POLICY "Public can view gallery images" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Authenticated can upload gallery images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery');
CREATE POLICY "Authenticated can update gallery images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'gallery');
CREATE POLICY "Authenticated can delete gallery images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery');
