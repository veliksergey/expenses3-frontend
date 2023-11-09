// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  app: {
    head: {
      title: 'Expenses3',
      link: [
        {
          rel: 'stylesheet',
          href: '/layout/styles/theme/theme-light/indigo/theme.css',
          id: 'theme-link',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
    // link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  runtimeConfig: {
	public: {
		backendUrl: process.env.BACKEND_BASE_URL,
	}
  },
  // css: [
  //   'primevue/resources/themes/lara-dark-teal/theme.css',
  //   '@/assets/styles.scss',
  //   'primeicons/primeicons.css',
  // ],
  modules: ['nuxt-primevue', '@pinia/nuxt', '@vee-validate/nuxt'],
  primevue: {
    usePrimeVue: true,
    options: {
      // unstyled: false,
      ripple: true,
      // inputStyle: 'filled',
    },
    // importPT: {as: 'Tailwind', from: 'primevue/passthrough/tailwind'},
    // cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    components: {
      include: '*',
    },
    directives: {
      include: '*',
    },
    composables: {
      include: '*',
    },
  },
  alias: {
    quill: process.dev ? 'quill/dist/quill.js' : 'quill',
  },
  css: ['@/assets/styles.scss', 'primeicons/primeicons.css'],
});
