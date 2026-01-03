-- 🌀 1. CRIAÇÃO DAS TABELAS

-- Tabela de Perfis de Usuário
-- Armazena dados públicos do usuário, vinculados ao usuário de autenticação do Supabase.
DROP TABLE IF EXISTS public.profiles;
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    email TEXT,
    subscription TEXT DEFAULT 'Free',
    role TEXT DEFAULT 'User',
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
COMMENT ON TABLE public.profiles IS 'Armazena o perfil público dos usuários, estendendo a tabela auth.users.';

-- Tabela de Treinos
DROP TABLE IF EXISTS public.workouts;
CREATE TABLE public.workouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT,
    duration INT,
    level TEXT,
    is_premium BOOLEAN DEFAULT false,
    video_url TEXT,
    thumbnail_url TEXT,
    thumbnail_hint TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
COMMENT ON TABLE public.workouts IS 'Armazena informações sobre os vídeos de treino.';

-- Tabela de Receitas
DROP TABLE IF EXISTS public.recipes;
CREATE TABLE public.recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT,
    prep_time INT,
    cook_time INT,
    calories INT,
    is_premium BOOLEAN DEFAULT false,
    image_url TEXT,
    image_hint TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
COMMENT ON TABLE public.recipes IS 'Armazena as receitas disponíveis no aplicativo.';

-- Tabela de Artigos
DROP TABLE IF EXISTS public.articles;
CREATE TABLE public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    author TEXT,
    published_at DATE,
    is_premium BOOLEAN DEFAULT false,
    image_url TEXT,
    image_hint TEXT,
    content TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
COMMENT ON TABLE public.articles IS 'Armazena artigos e dicas de saúde e bem-estar.';

-- Tabela de Depoimentos
DROP TABLE IF EXISTS public.testimonials;
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    testimonial TEXT NOT NULL,
    thumbnail_url TEXT,
    thumbnail_hint TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
COMMENT ON TABLE public.testimonials IS 'Armazena depoimentos de usuários.';

-- Tabela de Anúncios
DROP TABLE IF EXISTS public.ads;
CREATE TABLE public.ads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT,
    title TEXT NOT NULL,
    image_url TEXT,
    image_hint TEXT,
    is_active BOOLEAN DEFAULT true,
    expires_at DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
COMMENT ON TABLE public.ads IS 'Armazena informações para campanhas de anúncios.';


-- 🌀 2. POLÍTICAS DE SEGURANÇA (RLS - Row Level Security)

-- Habilita RLS e permite leitura pública para a maioria das tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Workouts are viewable by everyone." ON public.workouts FOR SELECT USING (true);
CREATE POLICY "Admins can manage all workouts." ON public.workouts FOR ALL USING ( (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'Admin' );

ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Recipes are viewable by everyone." ON public.recipes FOR SELECT USING (true);
CREATE POLICY "Admins can manage all recipes." ON public.recipes FOR ALL USING ( (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'Admin' );

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Articles are viewable by everyone." ON public.articles FOR SELECT USING (true);
CREATE POLICY "Admins can manage all articles." ON public.articles FOR ALL USING ( (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'Admin' );

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Testimonials are viewable by everyone." ON public.testimonials FOR SELECT USING (status = 'approved');
CREATE POLICY "Admins can manage all testimonials." ON public.testimonials FOR ALL USING ( (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'Admin' );

ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ads are viewable by everyone." ON public.ads FOR SELECT USING (is_active = true AND expires_at > now());
CREATE POLICY "Admins can manage all ads." ON public.ads FOR ALL USING ( (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'Admin' );


-- 🌀 3. FUNÇÕES E TRIGGERS

-- Função para criar um perfil quando um novo usuário se registra no auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, email, photo_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- Trigger que chama a função handle_new_user a cada novo registro
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 🌀 4. INSERÇÃO DE DADOS (SEEDING)

-- Inserir Treinos
INSERT INTO public.workouts (title, category, duration, level, is_premium, video_url, thumbnail_url, thumbnail_hint) VALUES
('HIIT Express', 'Cardio', 15, 'Advanced', false, 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610776226_122094250413204574_3447186860395560382_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uAPIqEeV8rEQ7kNvwErGvdr&_nc_oc=AdmojXGFJMImfmkx-SyecWayH4RjotRlN2U24mx_OQLTNTHhL2x-t96GaeaUQEqIi7ptAqkPbyRbeUPajpDIlWkU&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=PCg1f1GLhWjb7qWO_hgemA&oh=00_AfqCpYQG4SeSckTh3mcE9f4PeHYYKV_mZ5YKBMlrTCu6Ag&oe=695ED3E7', 'man lifting weights'),
('Yoga Matinal', 'Yoga', 20, 'Beginner', false, 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/611263422_122094244149204574_2843972870277414775_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4USiOEABauwQ7kNvwErTUaD&_nc_oc=Adn2nzaSLXyOFRWypjUJzhF7ABC1JhV9Dzxhbaws6VINfbSSsCVMxUIOe6WwCuC2ZHxs1FyDsh--OpxzSL6-n9fN&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=atYY1D9e8SFdalYlvJn_-g&oh=00_AfpJJzkrNQMc1REJc_y9p9j2xloJkwT8jcUcmqrxSBsQ-g&oe=695EE0B0', 'woman doing yoga sunset'),
('Treino de Força', 'Weightlifting', 45, 'Intermediate', true, 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610660601_122094250269204574_1400262102073866173_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=f6t67t3E7q4Q7kNvwFf2t9d&_nc_oc=Adg69J23_iP9w_Vvj1s12_wAUnbL6iG3Jc48l6dJ1b36k_V2m6N_Vq8yGf11mJ3-r8vY-3q1qCg4P-tI5Jk9jX5dM&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=A_V0S3C2xS-aF1lB-b1z6w&oh=00_AfrfHq9zYy-u6_xQG67h6v5mO5Z4b1t8w5tXy3mZ5oI6Ag&oe=695EDA2B', 'gym weights rack'),
('Power Lifting Pro', 'Weightlifting', 60, 'Advanced', true, 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610776226_122094250413204574_3447186860395560382_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uAPIqEeV8rEQ7kNvwErGvdr&_nc_oc=AdmojXGFJMImfmkx-SyecWayH4RjotRlN2U24mx_OQLTNTHhL2x-t96GaeaUQEqIi7ptAqkPbyRbeUPajpDIlWkU&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=PCg1f1GLhWjb7qWO_hgemA&oh=00_AfqCpYQG4SeSckTh3mcE9f4PeHYYKV_mZ5YKBMlrTCu6Ag&oe=695ED3E7', 'powerlifting person'),
('Core Avançado', 'Pilates', 25, 'Intermediate', true, 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610815124_122094249821204574_8683515086815594966_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=d4h_4g-bN8sQ7kNvwH_7_aK&_nc_oc=AdhrAfrq6nJkI4y5y6T4Gk1nJj2N_1e63SjP0g8R1uY-9U1p2p3W1o5g9X6v4o0u5Zc&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=AR52gGjV0fIaq2S1jXw2Cg&oh=00_AfB75xG7m3g8v1s2n9f5q4f6Y5k2w2N7V9x6x7Y6j3z_ZQ&oe=695ED7F7', 'person doing crunches');

-- Inserir Receitas
INSERT INTO public.recipes (title, category, prep_time, cook_time, calories, is_premium, image_url, image_hint) VALUES
('Salada de Quinoa com Abacate', 'Lunch', 15, 20, 350, false, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop', 'quinoa salad'),
('Salmão Grelhado com Aspargos', 'Dinner', 10, 15, 550, true, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1887&auto=format&fit=crop', 'grilled salmon');

-- Inserir Artigos
INSERT INTO public.articles (title, author, published_at, is_premium, image_url, image_hint, content, category) VALUES
('O Segredo do Jejum Intermitente', 'Dra. Luiza Mello', '2024-07-30', true, 'https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610660601_122094250269204574_1400262102073866173_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=f6t67t3E7q4Q7kNvwFf2t9d&_nc_oc=Adg69J23_iP9w_Vvj1s12_wAUnbL6iG3Jc48l6dJ1b36k_V2m6N_Vq8yGf11mJ3-r8vY-3q1qCg4P-tI5Jk9jX5dM&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=A_V0S3C2xS-aF1lB-b1z6w&oh=00_AfrfHq9zYy-u6_xQG67h6v5mO5Z4b1t8w5tXy3mZ5oI6Ag&oe=695EDA2B', 'healthy food bowl', 'Descubra como o tempo de alimentação afeta seu metabolismo...', 'NUTRIÇÃO'),
('10 Dicas para Manter a Motivação', 'Coach Rick', '2024-07-28', false, 'https://images.unsplash.com/photo-1475666673248-340a5289d185?q=80&w=2070&auto=format&fit=crop', 'motivation sunrise', 'Estratégias mentais para não desistir da sua jornada fitness...', 'MENTAL');

-- Inserir Depoimentos
INSERT INTO public.testimonials (name, testimonial, thumbnail_url, thumbnail_hint, status) VALUES
('Carlos Silva', '"Perdi 15kg em 3 meses! O VivaFit mudou minha vida, o acompanhamento da IA e as receitas fizeram toda a diferença."', 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3', 'happy man smiling', 'pending'),
('Mariana Costa', '"Finalmente encontrei treinos que eu amo fazer. A variedade é incrível e os vídeos são super fáceis de seguir."', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3', 'woman portrait smiling', 'approved');

-- Inserir Anúncios
INSERT INTO public.ads (company, title, image_url, image_hint, is_active, expires_at) VALUES
('NutriHealth', 'Suplementos para sua Performance', 'https://images.unsplash.com/photo-1547592180-85f173990554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoZWFsdGh5JTIwZm9vZHxlbnwwfHx8fDE3Njc0MjE2MzF8MA&ixlib_rb-4.1.0&q=80&w=1080', 'healthy food', true, '2025-12-31'),
('FastFeet', 'O Tênis Ideal para sua Corrida', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxydW5uaW5nJTIwc2hvZXN8ZW58MHx8fHwxNzY3NDI5MTM2fDA&ixlib_rb-4.1.0&q=80&w=1080', 'running shoes', true, '2025-06-30');

-- Fim do script
