-- 20240522_add_tool_counts_to_profiles.sql

ALTER TABLE profiles
  ADD COLUMN humanizer_count integer NOT NULL DEFAULT 0,
  ADD COLUMN ai_detector_count integer NOT NULL DEFAULT 0,
  ADD COLUMN plagiarism_count integer NOT NULL DEFAULT 0;