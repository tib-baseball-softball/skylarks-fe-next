/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
export interface BaseCollectionResponse {
	/**
	 * 15 characters string to store as record ID.
	 */
	id: string;
	/**
	 * Date string representation for the creation date.
	 */
	created: string;
	/**
	 * Date string representation for the creation date.
	 */
	updated: string;
	/**
	 * The collection id.
	 */
	collectionId: string;
	/**
	 * The collection name.
	 */
	collectionName: string;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface BaseCollectionCreate {
	/**
	 * 15 characters string to store as record ID.
	 * If not set, it will be auto generated.
	 */
	id?: string;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface BaseCollectionUpdate {}

// https://pocketbase.io/docs/collections/#auth-collection
export interface AuthCollectionResponse extends BaseCollectionResponse {
	/**
	 * The username of the auth record.
	 */
	username: string;
	/**
	 * Auth record email address.
	 */
	email: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility: boolean;
	/**
	 * Indicates whether the auth record is verified or not.
	 */
	verified: boolean;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface AuthCollectionCreate extends BaseCollectionCreate {
	/**
	 * The username of the auth record.
	 * If not set, it will be auto generated.
	 */
	username?: string;
	/**
	 * Auth record email address.
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Auth record password.
	 */
	password: string;
	/**
	 * Auth record password confirmation.
	 */
	passwordConfirm: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface AuthCollectionUpdate {
	/**
	 * The username of the auth record.
	 */
	username?: string;
	/**
	 * The auth record email address.
	 * This field can be updated only by admins or auth records with "Manage" access.
	 * Regular accounts can update their email by calling "Request email change".
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Old auth record password.
	 * This field is required only when changing the record password. Admins and auth records with "Manage" access can skip this field.
	 */
	oldPassword?: string;
	/**
	 * New auth record password.
	 */
	password?: string;
	/**
	 * New auth record password confirmation.
	 */
	passwordConfirm?: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/collections/#view-collection
export interface ViewCollectionRecord {
	id: string;
}

// utilities

type MaybeArray<T> = T | T[];

// ===== users =====

export interface UsersResponse extends AuthCollectionResponse {
	collectionName: 'users';
	first_name: string;
	last_name: string;
	avatar: string;
	teams: Array<string>;
	club: Array<string>;
}

export interface UsersCreate extends AuthCollectionCreate {
	first_name?: string;
	last_name?: string;
	avatar?: File | null;
	teams?: MaybeArray<string>;
	club?: MaybeArray<string>;
}

export interface UsersUpdate extends AuthCollectionUpdate {
	first_name?: string;
	last_name?: string;
	avatar?: File | null;
	teams?: MaybeArray<string>;
	'teams+'?: MaybeArray<string>;
	'teams-'?: MaybeArray<string>;
	club?: MaybeArray<string>;
	'club+'?: MaybeArray<string>;
	'club-'?: MaybeArray<string>;
}

export interface UsersCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'users';
	response: UsersResponse;
	create: UsersCreate;
	update: UsersUpdate;
	relations: {
		teams: TeamsCollection[];
		club: ClubsCollection[];
		'events(participants)': EventsCollection[];
	};
}

// ===== events =====

export interface EventsResponse extends BaseCollectionResponse {
	collectionName: 'events';
	bsm_id: number;
	title: string;
	desc: string;
	starttime: string;
	meetingtime: string;
	endtime: string;
	type: 'game' | 'practice' | 'misc';
	participants: Array<string>;
	attire: string;
	team: string;
}

export interface EventsCreate extends BaseCollectionCreate {
	bsm_id?: number;
	title: string;
	desc?: string;
	starttime: string | Date;
	meetingtime: string | Date;
	endtime?: string | Date;
	type: 'game' | 'practice' | 'misc';
	participants?: MaybeArray<string>;
	attire?: string;
	team: string;
}

export interface EventsUpdate extends BaseCollectionUpdate {
	bsm_id?: number;
	'bsm_id+'?: number;
	'bsm_id-'?: number;
	title?: string;
	desc?: string;
	starttime?: string | Date;
	meetingtime?: string | Date;
	endtime?: string | Date;
	type?: 'game' | 'practice' | 'misc';
	participants?: MaybeArray<string>;
	'participants+'?: MaybeArray<string>;
	'participants-'?: MaybeArray<string>;
	attire?: string;
	team?: string;
}

export interface EventsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'events';
	response: EventsResponse;
	create: EventsCreate;
	update: EventsUpdate;
	relations: {
		participants: UsersCollection[];
		team: TeamsCollection;
	};
}

// ===== clubs =====

export interface ClubsResponse extends BaseCollectionResponse {
	collectionName: 'clubs';
	name: string;
	bsm_id: number;
}

export interface ClubsCreate extends BaseCollectionCreate {
	name?: string;
	bsm_id?: number;
}

export interface ClubsUpdate extends BaseCollectionUpdate {
	name?: string;
	bsm_id?: number;
	'bsm_id+'?: number;
	'bsm_id-'?: number;
}

export interface ClubsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'clubs';
	response: ClubsResponse;
	create: ClubsCreate;
	update: ClubsUpdate;
	relations: {
		'users(club)': UsersCollection[];
		'teams(club)': TeamsCollection[];
	};
}

// ===== teams =====

export interface TeamsResponse extends BaseCollectionResponse {
	collectionName: 'teams';
	name: string;
	bsm_league_group: number;
	age_group: 'adults' | 'minors';
	club: string;
}

export interface TeamsCreate extends BaseCollectionCreate {
	name: string;
	bsm_league_group?: number;
	age_group: 'adults' | 'minors';
	club: string;
}

export interface TeamsUpdate extends BaseCollectionUpdate {
	name?: string;
	bsm_league_group?: number;
	'bsm_league_group+'?: number;
	'bsm_league_group-'?: number;
	age_group?: 'adults' | 'minors';
	club?: string;
}

export interface TeamsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'teams';
	response: TeamsResponse;
	create: TeamsCreate;
	update: TeamsUpdate;
	relations: {
		'users(teams)': UsersCollection[];
		'events(team)': EventsCollection[];
		club: ClubsCollection;
	};
}

// ===== Schema =====

export type Schema = {
	users: UsersCollection;
	events: EventsCollection;
	clubs: ClubsCollection;
	teams: TeamsCollection;
};
