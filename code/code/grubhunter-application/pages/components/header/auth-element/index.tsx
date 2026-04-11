import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./index.module.css";
import Link from "next/link";
import ButtonComponent from "../../button";

const AuthElement = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" && (
        <span className={styles.name}>Welcome, {session?.user.name}!</span>
      )}
      <nav className={styles.root}>
        {status === "authenticated" ? (
          <>
            <ButtonComponent isDisabled={false} variant={"outline"}>
              <Link href={`/list/${session?.user.fdlst_private_userId}`}>
                Wish List
              </Link>
            </ButtonComponent>

            <ButtonComponent
              isDisabled={false}
              variant="blue"
              clickHandler={() => signOut()}
            >
              Sign Out
            </ButtonComponent>
          </>
        ) : (
          <ButtonComponent
            isDisabled={false}
            variant="blue"
            clickHandler={() => signIn()}
          >
            Sign In
          </ButtonComponent>
        )}
      </nav>
    </>
  );
};

export default AuthElement;
