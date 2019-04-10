<template>
  <div class="studio">
    <aside class="studio-left-bar">
      <div>
        <p class="panel-heading">Routes</p>
        <RouteDisplay/>
      </div>
      <div>
        <HomeSidebar/>
      </div>
    </aside>
    <maint class="studio-main">
      <ComponentDisplay/>
    </maint>
    <aside class="studio-right-bar">
      <HomeQueue/>
    </aside>
  </div>
</template>

<script>
import ComponentDisplay from '@/components/ComponentDisplay.vue';
import HomeSidebar from '@/components/HomeSidebar';
import HomeQueue from '@/components/HomeQueue';
import RouteDisplay from '@/components/RouteDisplay';
import ProjectTabs from '@/components/ProjectTabs';

export default {
  name: 'Home',
  components: {
    ComponentDisplay,
    HomeSidebar,
    HomeQueue,
    RouteDisplay,
    ProjectTabs
  }
};
</script>

<style lang="scss" scoped>
$sidebar-height: 220px;
.studio {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: $sidebar-height auto $sidebar-height;
  grid-template-rows: 100%;
  &-left-bar {
  }
  &-main {
    background-color: #ddd;
  }
  &-right-bar {
  }
}
</style>
