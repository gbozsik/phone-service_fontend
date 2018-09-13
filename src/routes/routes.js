export default [
  {
    path: "/",
    name: "home.index",
    component: resolve => require(["@/views/Home.vue"], resolve)
  },
  {
    path: "/intake",
    name: "intake.index",
    component: resolve => require(["@/views/Intake.vue"], resolve)
  },
  {
    path: "/users",
    name: "users.index",
    component: resolve => require(["@/views/Users.vue"], resolve)
  },
  {
    path: "/partners",
    name: "partners.index",
    component: resolve => require(["@/views/Partners.vue"], resolve)
  },
  {
    path: "/customers",
    name: "customers.index",
    component: resolve => require(["@/views/Customers.vue"], resolve)
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
