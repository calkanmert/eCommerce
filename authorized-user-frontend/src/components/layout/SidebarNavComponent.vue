<script setup lang="ts">
import menuItems from '@/repository/menu-items.json';
</script>

<template>
  <ul class="sidebar-nav">
    <template v-for="(category, index) in menuItems" :key="index">
      <template v-if="category.isEnabled">
        <li class="sidebar-header">{{ category.name }}</li>
        <template v-for="(item, itemIndex) in category.items" :key="itemIndex">
          <router-link
            :to="{ name: item.route } "
            v-slot="{ isExactActive }"
            v-if="item.isEnabled"
            class="text-decoration-none"
          >
            <li class="sidebar-item" :class="[isExactActive && 'active']">
              <a class="sidebar-link">
                <vue-feather size="11" class="align-middle" type="circle"></vue-feather>
                <span class="align-middle">{{ item.name }}</span>
              </a>
            </li>
          </router-link>
        </template>
      </template>
    </template>
  </ul>
</template>
