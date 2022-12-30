<template>
  <q-page padding>
    <q-form
      class="row q-mt-xl items-center justify-center full-height full-width"
      @submit.prevent="onSubmit"
    >
      <p class="col-12 text-h5 text-center">Contraseña olvidada</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-mt-sm">
        <q-input
          v-model="email"
          type="email"
          label="Email"
          lazy-rules
          :rules="emailRules"
        />

        <q-btn
          class="full-width q-mt-xl"
          color="primary"
          outline
          rounded
          label="Enviar correo de recuperación"
          type="submit"
          :loading="loadingBtn"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import useAuth from "src/composables/UseAuth";
import { ref } from "vue";

const $q = useQuasar();
const { resetPassword } = useAuth();

const email = ref("");
const loadingBtn = ref(false);
const emailRules = [(val) => (val && val.length > 0) || "Email es requerido"];

const onSubmit = () => {
  loadingBtn.value = true;
  try {
    resetPassword(email.value);
    $q.dialog({
      html: true,
      message: `Por favor revise su correo <strong>${email.value}</strong> para crear una nueva contraseña`,
    });
  } finally {
    loadingBtn.value = false;
  }
};
</script>
