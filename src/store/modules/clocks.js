export default {
	actions: {
		createNewZone({ commit }, obj) {
			commit('CREATE_NEW_ZONE', obj);
		},
		fetchZones({ commit }) {
			if (localStorage.zones && localStorage.zones.length > 0) {
				commit('UPDATE_ZONES', JSON.parse(localStorage.getItem('zones')));
			}
		},
		editZoneInfo({ commit, state }, id) {
			state.timezones.forEach((item) => {
				if (item.id === id) {
					commit('EDIT_CURRENT_ZONE', item);
				}
			});
		},
	},
	mutations: {
		CREATE_NEW_ZONE(state, data) {
			state.zonesList.push(data);
			localStorage.setItem('zones', JSON.stringify(state.zonesList));
		},
		UPDATE_ZONES(state, data) {
			state.zonesList = data;
		},
		EDIT_CURRENT_ZONE(state, data) {
			state.currentZone = data;
		},
	},
	state: {
		timezones: [
			{
				id: '0',
				name: 'ACST',
				offsetHours: '9',
				offsetMinutes: '30',
				position: 'east',
				fullname: 'Australian Central Standard Time',
			},
			{
				id: '1',
				name: 'AEST',
				offsetHours: '10',
				offsetMinutes: '0',
				position: 'east',
				fullname: 'Australian Eastern Standard Time',
			},
			{
				id: '2',
				name: 'AKST',
				offsetHours: '-9',
				offsetMinutes: '0',
				position: 'west',
				fullname: 'Alaska Standard Time',
			},
			{
				id: '3',
				name: 'AST',
				offsetHours: '-4',
				offsetMinutes: '0',
				position: 'west',
				fullname: 'Atlantic Standard Time',
			},
			{
				id: '4',
				name: 'AWST',
				offsetHours: '8',
				offsetMinutes: '0',
				position: 'east',
				fullname: 'Australian Western Standard Time',
			},
			{
				id: '5',
				name: 'CAT',
				offsetHours: '2',
				offsetMinutes: '0',
				position: 'east',
				fullname: 'Central Africa Time',
			},
			{
				id: '6',
				name: 'CET',
				offsetHours: '1',
				offsetMinutes: '0',
				position: 'east',
				fullname: 'Central European Time',
			},
			{
				id: '7',
				name: 'CST',
				offsetHours: '-6',
				offsetMinutes: '0',
				position: 'west',
				fullname: 'Central Time',
			},
			{
				id: '8',
				name: 'EAT',
				offsetHours: '3',
				offsetMinutes: '0',
				position: 'east',
				fullname: 'Eastern Africa Time',
			},
			{
				id: '9',
				name: 'EET',
				offsetHours: '2',
				offsetMinutes: '0',
				position: 'east',
				fullname: 'Eastern European Time',
			},
			{
				id: '10',
				name: 'EST',
				offsetHours: '-5',
				offsetMinutes: '0',
				position: 'west',
				fullname: 'Eastern Time',
			},
			{
				id: '11',
				name: 'GMT',
				offsetHours: '0',
				offsetMinutes: '0',
				position: 'east',
				fullname: 'Greenwich Mean Time',
			},
			{
				id: '12',
				name: 'HAST',
				offsetHours: '-10',
				offsetMinutes: '0',
				position: 'west',
				fullname: 'Hawaii-Aleutian Standard Time',
			},
			{
				id: '13',
				name: 'MSK',
				offsetHours: '3',
				offsetMinutes: '3',
				position: 'east',
				fullname: 'Moscow Standard Time',
			},
			{
				id: '14',
				name: 'MST',
				offsetHours: '-7',
				offsetMinutes: '0',
				position: 'west',
				fullname: 'Mountain Time',
			},
			{
				id: '15',
				name: 'NST',
				offsetHours: '-3',
				offsetMinutes: '30',
				position: 'west',
				fullname: 'Newfoundland Standard Time',
			},
			{
				id: '16',
				name: 'PST',
				offsetHours: '-8',
				offsetMinutes: '0',
				position: 'west',
				fullname: 'Pacific Time',
			},
			{
				id: '17',
				name: 'UTC',
				offsetHours: '0',
				offsetMinutes: '0',
				position: 'east',
				fullname: 'Coordinated Universal Time',
			},
			{
				id: '18',
				name: 'WAT',
				offsetHours: '1',
				offsetMinutes: '0',
				position: 'east',
				fullname: 'West Africa Time',
			},
			{
				id: '19',
				name: 'WET',
				offsetHours: '0',
				offsetMinutes: '0',
				position: 'east',
				fullname: 'Western European Time',
			},
		],
		zonesList: [],
	},
	getters: {
		getTimezones(state) {
			return state.timezones;
		},
		getZonesList(state) {
			return state.zonesList;
		},
	},
};
