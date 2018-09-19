export default [
    {
        path: "/",
        name: "home.index",
        component: resolve => require(["@/views/Home.vue"], resolve)
    },
    {
        path: "/intake",
        name: "intake.index",
        component: resolve => require(["@/views/Claim.vue"], resolve)
    },
    {
        path: "/repair",
        name: "repair.index",
        component: resolve => require(["@/views/Claim.vue"], resolve)
    },
    {
        path: "/claimlist",
        name: "claimlist.index",
        component: resolve => require(["@/views/ClaimList.vue"], resolve)
    },
    {
        path: "/outtake",
        name: "outtake.index",
        component: resolve => require(["@/views/Claim.vue"], resolve)
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
