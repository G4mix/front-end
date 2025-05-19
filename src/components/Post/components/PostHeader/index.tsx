import Image from "next/image";
import styles from "../../style.module.css";
import { FaUserCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

interface IPostHeader {
  userImage?: string;
}

export const PostHeader = ({ userImage }: IPostHeader) => {
  return (
    <header className={styles.postHeader}>
      <div className={styles.postHeaderInfo}>
        {userImage ? (
          <Image
            src={userImage}
            alt=""
            className={styles.userImage}
            width={18}
            height={18}
          />
        ) : (
          <FaUserCircle className={styles.userImage} />
        )}

        <h2>
          Lorem Ipsum &bull; <span>05 mar. 25</span>
        </h2>
      </div>

      <button>
        <BsThreeDots className={styles.postHeaderDotsIcon} />
      </button>
    </header>
  );
};
