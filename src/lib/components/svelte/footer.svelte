<script>
    import '@tailwind';
	import { House, User, ShoppingCart } from 'lucide-svelte';
    import '$lib/components/css/footer.css';
	import { totalCartItems } from '$lib/components/ts/cart'

	
</script>

<footer>
	<nav>
		<ul>
			<a href="/"><li><House size={20}/><span>Home</span></li></a>
			<a href="/cart">
				<li>
					<div class="indicator">
						<span class="indicator-item badge bg-red-500 text-white">
							{#await totalCartItems() then value}
							{value}
							{/await}</span>
						<ShoppingCart size={20}/>
					</div>
					<span>Cart</span>
				</li>
			</a>
			<a href="/profile" rel="noopener noreferrer"><li><User size={20}/><span>You</span></li></a>	
		</ul>
	</nav>
</footer>



