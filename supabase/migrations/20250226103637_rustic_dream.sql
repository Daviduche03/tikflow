/*
  # Create user connections table

  1. New Tables
    - `user_connections`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `provider` (text, e.g., 'tiktok')
      - `access_token` (text)
      - `refresh_token` (text)
      - `expires_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `user_connections` table
    - Add policy for authenticated users to read their own connections
    - Add policy for authenticated users to update their own connections
*/

CREATE TABLE IF NOT EXISTS user_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  provider text NOT NULL,
  access_token text NOT NULL,
  refresh_token text,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, provider)
);

ALTER TABLE user_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own connections"
  ON user_connections
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own connections"
  ON user_connections
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own connections"
  ON user_connections
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);