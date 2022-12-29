<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title> Mis Números </q-toolbar-title>
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    mini-to-overlay
    :width="250"
    :breakpoint="500"
    bordered
    class="bg-grey-3"
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
      <q-list padding>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <!-- Logout item -->
        <q-item @click="handleLogout" clickable>
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Cerrar sesión</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import EssentialLink from "components/EssentialLink.vue";
import { ref } from "vue";

const essentialLinks = [
  {
    title: "Ingresos",
    icon: "trending_up",
    link: "#",
    haveAddIcon: true,
    handleAddAction: () => {},
  },
  {
    title: "Gastos",
    icon: "trending_down",
    link: "#",
    haveAddIcon: true,
    handleAddAction: () => {},
  },
  {
    title: "Transferencias",
    icon: "swap_horiz",
    link: "#",
    haveAddIcon: true,
    handleAddAction: () => {},
  },
  {
    title: "Presupuestos",
    icon: "donut_large",
    link: "#",
  },
  {
    title: "Categorias",
    icon: "bookmarks",
    link: "#",
  },
  {
    title: "Cajas",
    icon: "wallet",
    link: "#",
  },
  {
    title: "Reportes",
    icon: "bar_chart",
    link: "#",
  },
];
const leftDrawerOpen = ref(false);
const miniState = ref(true);

const handleLogout = async () => {
  /* $q.dialog({
    title: "Cerrar sesión",
    message: "Esta seguro que quiere cerrar la sesión?",
    cancel: true,
    ok: "Si, cerrar sesión",
  }).onOk(async () => {
    router.replace({ name: "login" });
  }); */
};
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
