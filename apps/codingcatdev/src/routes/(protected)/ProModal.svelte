<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		ArrowTopRightOnSquare,
		CheckCircle,
		PaintBrush,
		RocketLaunch
	} from '@steeze-ui/heroicons';

	import KcPrimary from '$lib/components/global/icons/KCPrimary.svelte';
	import AjPrimary from '$lib/components/global/icons/AJPrimary.svelte';

	let monthly = true;
	const onSelect = (setMonth: boolean) => {
		monthly = setMonth;
	};
	import { getModalStore, getToastStore, ProgressRadial } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	const toastStore = getToastStore();

	import { addSubscription } from '$lib/client/firebase';
	import { onSnapshot } from 'firebase/firestore';

	let redirecting = false;
	const onSubscribe = async (products: { role: string; price: string }[], uid: string) => {
		const price = products
			.filter((p) => (monthly ? p.role === 'monthly' : p.role === 'yearly'))
			.at(0)?.price;
		if (!price) {
			toastStore.trigger({
				message: 'Missing price data, contact Alex!',
				background: 'variant-filled-error'
			});
		} else {
			redirecting = true;
			const docRef = await addSubscription(price, uid);

			onSnapshot(docRef, (snap) => {
				const { error, url } = snap.data() as { error: Error; url: string };
				if (error) {
					toastStore.trigger({
						message: error.message,
						background: 'variant-filled-error'
					});
				}
				if (url) {
					// We have a Stripe Checkout URL, let's redirect.
					window.location.assign(url);
				}
			});
		}
	};

	const base = 'card p-2 md:p-8 flex flex-col items-center relative w-full hover:bg-opacity-90';
</script>

<div class="card p-2 md:p-8 flex flex-col gap-2 md:gap-8">
	<div class="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-8">
		<button
			class={`${base} ${monthly ? 'variant-filled-primary' : 'variant-soft-primary'}`}
			on:click={() => onSelect(true)}
		>
			{#if monthly}
				<div class="absolute top-0 right-0 mr-2 mt-2">
					<Icon src={CheckCircle} theme="solid" class="w-8" />
				</div>
			{/if}
			<span class="font-medium text-xl">Monthly</span>
			<div class="flex flex-row items-end justify-center mt-2">
				<span class="text-5xl font-bold">$5</span>
				<div class="mt-5">
					<span class="text-surface-50-900-token font-medium text-xl">/mo</span>
				</div>
			</div>
			<div class="mb-6">
				<span class="font-medium text-xs">Just $0.17 per day</span>
			</div>
			<KcPrimary />
		</button>
		<button
			class={`${base} ${!monthly ? 'variant-filled-primary' : 'variant-soft-primary'}`}
			on:click={() => onSelect(false)}
		>
			{#if !monthly}
				<div class="absolute top-0 right-0 mr-2 mt-2">
					<Icon src={CheckCircle} theme="solid" class="w-8" />
				</div>
			{/if}
			<span class="font-medium text-xl">Annual</span>
			<div class="flex flex-row items-end justify-center mt-2">
				<span class="text-5xl font-bold">$48</span>
				<div class="mt-5">
					<span class="text-surface-50-900-token font-medium text-xl">/year</span>
				</div>
			</div>
			<div class="mb-6">
				<span class="font-medium text-xs">Save $12 compared to monthly</span>
			</div>
			<AjPrimary />
		</button>
	</div>
	<div>
		<div class="card variant-filled-primary p-2 md:p-8">
			<h2>Pro</h2>
			<ul class="text-left text-md md:text-lg">
				<li class="my-2 flex flex-row gap-1 items-center">
					<Icon src={RocketLaunch} theme="solid" class="w-8" />
					Watch all PRO courses
				</li>
				<li class="my-2 flex flex-row gap-1 items-center">
					<Icon src={RocketLaunch} theme="solid" class="w-8" />
					Join PRO office hours
				</li>
				<li class="my-2 flex flex-row gap-1 items-center">
					<Icon src={RocketLaunch} theme="solid" class="w-8" />
					Read all PRO posts
				</li>
				<li class="my-2 flex flex-row gap-1 items-center">
					<Icon src={PaintBrush} theme="solid" class="w-8" />
					Pro Picked Custom Theme
				</li>
			</ul>
		</div>
	</div>

	{#if redirecting}
		<button class="btn variant-filled-surface flex self-end gap-2">
			Redirecting
			<ProgressRadial
				stroke={100}
				meter="stroke-primary-50"
				track="stroke-primary-500/30"
				class="w-8"
			/>
		</button>
	{:else}
		<button
			class="btn variant-filled-surface flex self-end gap-2"
			on:click|once={() => onSubscribe($modalStore[0].meta?.products, $modalStore[0].meta?.uid)}
		>
			Continue
			<Icon src={ArrowTopRightOnSquare} theme="mini" class="w-8" />
		</button>
	{/if}
</div>
