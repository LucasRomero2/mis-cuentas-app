<template>
  <q-page
    class="row q-pb-xl items-center justify-center full-height full-width"
    padding
  >
    <q-form @submit.prevent="onSubmit">
      <p class="col-12 text-h5 text-center">Iniciar sesión</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-mt-sm">
        <q-input
          v-model="formData.email"
          type="email"
          label="Email"
          lazy-rules
          :rules="formRules.email"
        />

        <q-input
          v-model="formData.password"
          :type="isPwd ? 'password' : 'text'"
          label="Contraseña"
          min-length="6"
          lazy-rules
          :rules="formRules.password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-btn
          class="full-width q-mt-lg"
          color="primary"
          outline
          rounded
          label="Ingresar"
          type="submit"
        />

        <q-btn @click="signInGoogle" class="full-width q-mt-md" rounded>
          <div class="row items-center">
            <q-icon class="q-mr-sm">
              <img src="~assets/google-logo.svg" alt="" />
            </q-icon>
            <span>Ingresar con google</span>
          </div>
        </q-btn>
        <div class="row justify-between q-mt-md">
          <router-link :to="{ name: 'register' }" class="sub-links">
            Crear Cuenta
          </router-link>
          <router-link :to="{ name: 'forgot-password' }" class="sub-links">
            Olvidé mi contraseña
          </router-link>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import useAuth from "src/composables/UseAuth";
import { ref } from "vue";
const { loginWithEmailAndPassword, signInGoogle } = useAuth();

const isPwd = ref(true);
const formData = ref({
  email: "",
  password: "",
});
const formRules = {
  email: [(val) => (val && val.length > 0) || "Email es requerido"],
  password: [(val) => (val && val.length > 0) || "Contraseña es requerida"],
};

const onSubmit = () => {
  loginWithEmailAndPassword(formData.value);
};
</script>

<style lang="scss" scoped>
.sub-links {
  cursor: pointer;
  color: $primary;
  &:hover {
    text-decoration: underline;
  }
}
</style>
