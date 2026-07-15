import type { OttOption } from "@/lib/demo-data";

const LOGOS: Record<string, string> = {
  netflix: "/__l5e/assets-v1/0c786f39-cf6a-4c6d-a657-076baf1351e7/netflix.svg",
  prime: "/__l5e/assets-v1/61b35872-3396-41b3-b5d9-77cddb56b6a2/prime-video.svg",
  hotstar: "/__l5e/assets-v1/078bb446-5a0a-482d-827a-fe067cf2a4f1/jiohotstar.png",
  zee5: "/__l5e/assets-v1/c17a208c-8ee7-4db5-8799-3cb90e6a9474/zee5.svg",
  sonyliv: "/__l5e/assets-v1/6918faec-87b7-4555-8c80-9fff17ae6523/sonyliv.png",
  appletv: "/__l5e/assets-v1/5640f94c-6ce2-426b-9def-c2d1912f376f/appletv.svg",
  chatgpt: "/__l5e/assets-v1/65fdf3f8-5625-432c-bde9-073c2d6f3875/chatgpt.svg",
  linkedin: "/__l5e/assets-v1/620147ed-595f-494a-b0b0-7b6e457ceb15/linkedin.svg",
  spotify: "/__l5e/assets-v1/c1958231-5b92-42c9-9208-4eb2619315f0/spotify.svg",
  youtube: "/__l5e/assets-v1/ff07ca9d-2e55-4926-924d-2d1342d85290/youtube.svg",
};

export function OttLogo({
  option,
  size = 20,
  rounded = 6,
}: {
  option: OttOption;
  size?: number;
  rounded?: number;
}) {
  const src = LOGOS[option.id];

  if (!src) return null;

  return (
    <img
      src={src}
      alt={`${option.name} logo`}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className="block object-contain"
      style={{ width: size, height: size, borderRadius: rounded }}
    />
  );
}