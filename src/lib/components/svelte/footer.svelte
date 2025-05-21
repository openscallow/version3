<script>
    import '@tailwind';
	import { House, User, ShoppingCart } from 'lucide-svelte';
    import '$lib/components/css/footer.css'
</script>

<footer>
	<nav>
		<ul>
			<a href="#"><li><House size={20}/><span>Home</span></li></a>
			<a href="http://" target="_blank" rel="noopener noreferrer">
				<li>
					<div class="indicator">
						<span class="indicator-item badge bg-red-500 text-white">2</span>
						<ShoppingCart size={20}/>
					</div>
					<span>Cart</span>
				</li>
			</a>
			<a href="http://" target="_blank" rel="noopener noreferrer"><li><User size={20}/><span>Account</span></li></a>	
		</ul>
	</nav>
</footer>



