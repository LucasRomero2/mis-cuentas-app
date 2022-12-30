import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useQuasar } from "quasar";
import { auth } from "../boot/firebase";
import { useRouter } from "vue-router";
import useNotify from "./UseNotify";

export default function useAuth() {
  const $q = useQuasar();
  const router = useRouter();
  const { notifySuccess, notifyError } = useNotify();

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    if ($q.platform.is.desktop) {
      signInWithPopup(auth, provider)
        .then((result) => {
          notifySuccess(`Bienvenido ${result.user.displayName}`);
          router.push({ name: "home" });
        })
        .catch((error) => console.error(error));
    }
    /* TODO: test in production */
    if ($q.platform.is.mobile) {
      signInWithRedirect(auth, provider)
        .then(() => {
          router.push({ name: "home" });
        })
        .catch((error) => console.error(error));
    }
  };

  const loginWithEmailAndPassword = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        notifySuccess(`Bienvenido ${result.user.displayName}`);
        router.push({ name: "home" });
      })
      .catch((error) => {
        notifyError("Error iniciando sesión");
        console.error(error);
      });
  };

  const singUpWithEmailAndPassword = ({ email, password, name }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        auth;
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            notifySuccess("Usuario creado con éxito");
            router.push({ name: "home" });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        notifyError("Error creando usuario");
        console.error(error);
      });
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email, {
      url: "http://localhost:9000/auth/ingresar",
      handleCodeInApp: false,
    }).catch((error) => {
      notifyError("Error enviando mail");
      console.error(error);
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.replace({ name: "login" });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return {
    signInGoogle,
    loginWithEmailAndPassword,
    singUpWithEmailAndPassword,
    resetPassword,
    logout,
  };
}
