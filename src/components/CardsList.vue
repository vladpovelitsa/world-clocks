<template>
	<v-container>
		<v-row>
			<v-col cols="12" md="6" lg="3">
				<v-select
					:items="sorting"
					label="Sort:"
					item-text="name"
					item-value="id"
					class="mb-2"
					outlined
					attach=""
					v-model="sortBy"
					@change="sortingZones"
					clearable
				></v-select>
			</v-col>
		</v-row>
		<v-row>
			<v-col
				v-for="(timeZone, key) in getZonesList"
				cols="12"
				md="6"
				lg="4"
				xl="2"
				class="mt-2"
				v-bind:key="timeZone.code"
			>
				<CardClock :id="key" :zoneInfo="timeZone" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import CardClock from './CardClock';
	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'CardsList',
		components: {
			CardClock,
		},
		computed: {
			...mapGetters(['getZonesList', 'getTimezones']),
		},
		data: () => ({
			sorting: [
				{ name: 'by description', id: 'byDesc' },
				{ name: 'West to East', id: 'WTE' },
				{ name: 'East to West', id: 'ETW' },
			],
			sortBy: '',
			zonesList: [],
		}),
		methods: {
			...mapActions(['fetchZones']),
			sortingZones() {
				let vm = this;
				function compare(a, b) {
					if (vm.sortBy == 'byDesc') {
						if (a.description < b.description) return -1;
						if (a.description > b.description) return 1;
						return 0;
					} else if (vm.sortBy == 'WTE') {
						if (
							+vm.getTimezones[a.id].offsetHours < +vm.getTimezones[b.id].offsetHours
						) {
							return -1;
						}

						if (
							+vm.getTimezones[a.id].offsetHours > +vm.getTimezones[b.id].offsetHours
						)
							return 1;
						return 0;
					} else if (vm.sortBy == 'ETW') {
						if (
							+vm.getTimezones[b.id].offsetHours < +vm.getTimezones[a.id].offsetHours
						) {
							return -1;
						}

						if (
							+vm.getTimezones[b.id].offsetHours > +vm.getTimezones[a.id].offsetHours
						)
							return 1;
						return 0;
					}
				}
				return this.getZonesList.sort(compare);
			},
		},
		created() {
			this.fetchZones();
		},
	};
</script>
