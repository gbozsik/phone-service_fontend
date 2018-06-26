export default [
  {
    path: "/",
    name: "home.index",
    component: resolve => require(["@/views/Home.vue"], resolve)
  },
  {
    path: "/users",
    name: "users.index",
    component: resolve => require(["@/views/Users.vue"], resolve)
  },
  {
    path: "/page-not-found",
    name: "page-not-found",
    component: resolve => require(["@/views/PageNotFound.vue"], resolve)
  },
  {
    path: "/*",
    redirect: "/page-not-found"
  }
];
