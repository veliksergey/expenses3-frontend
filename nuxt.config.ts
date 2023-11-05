// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Expenses3",
    },
    // link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
	devtools: {enabled: true},
	typescript: {
		strict: true,
	},
  css: [
    'primevue/resources/themes/lara-dark-teal/theme.css',
    '@/assets/main.css',
    'primeicons/primeicons.css',
  ],
	modules: [
		'nuxt-primevue',
	],
	primevue: {
		usePrimeVue: true,
		options: {
			unstyled: false,
			ripple: true,
			inputStyle: 'filled',
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
});
