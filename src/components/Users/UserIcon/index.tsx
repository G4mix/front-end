import Image from "next/image";

interface UserIconProps {
  displayName: string;
  icon?: string | null;
  size?: number;
  rounded?: boolean;
  fontSize?: string | number;
}

export const UserIcon = ({
  displayName,
  icon,
  size = 32,
  rounded = true,
  fontSize = "0.875rem",
}: UserIconProps) => {
  const hasIcon = !!icon;
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <>
      {hasIcon ? (
        <div
          style={{
            width: size,
            minWidth: size,
            height: size,
            minHeight: size,
            position: "relative",
          }}
        >
          <Image
            style={{
              borderRadius: rounded ? "50%" : "8px",
              objectFit: "cover",
            }}
            src={icon ?? ""}
            alt={displayName}
            fill
          />
        </div>
      ) : (
        <div
          style={{
            width: size,
            minWidth: size,
            height: size,
            minHeight: size,
            borderRadius: rounded ? "50%" : "8px",
            backgroundColor: "var(--secondary)",
            color: "var(--white)",
            fontSize: fontSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {firstLetter}
        </div>
      )}
    </>
  );
};
