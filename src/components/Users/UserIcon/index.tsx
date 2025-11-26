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
        <Image
          style={{ borderRadius: rounded ? "50%" : "8px" }}
          src={icon ?? ""}
          alt={displayName}
          width={size}
          height={size}
        />
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
