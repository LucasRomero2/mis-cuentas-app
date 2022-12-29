<template>
  <q-item clickable tag="a" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>

    <q-item-section v-if="haveAddIcon" avatar>
      <q-btn
        @click.stop="handleAddAction"
        class="gt-xs"
        size="12px"
        flat
        dense
        round
        icon="add"
      />
    </q-item-section>
  </q-item>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  link: {
    type: String,
    default: "#",
  },

  icon: {
    type: String,
    default: "",
  },

  haveAddIcon: {
    type: Boolean,
  },

  handleAddAction: {
    type: Function,
    default: () => {},
  },
});
</script>
