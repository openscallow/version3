<script>
    import '../global.css';
</script>
<svelte:head>
    <title>UPI Just Got an Update: Here's What Changed on August 1st, 2025</title>
</svelte:head>
    <div class="progress-bar" id="progressBar"></div>
    
    <div class="container">
        <aside class="sidebar">
            <div class="toc">
                <h3>
                    <svg class="meta-icon" viewBox="0 0 24 24">
                        <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"/>
                    </svg>
                    Table of Contents
                </h3>
                <ul class="toc-list">
                    <li><a href="#introduction">Introduction</a></li>
                    <li><a href="#Capping-Daily-Balance-Checks">Capping Daily Balance Checks</a></li>
                    <li><a href="#Limiting-Linked-Account-Enquiries">Limiting Linked Account Enquiries</a></li>
                    <li><a href="#Smart-Scheduling-for-Autopay-Mandates">SmartScheduling for Autopay Mandates</a></li>
                    <li><a href="#Throttling-Transaction-Status-Checks">Throttling Transaction Status Checks</a></li>
                    <li><a href="#conclusion">Conclusion</a></li>
                </ul>
            </div>
        </aside>

        <main class="main-content">
            <header class="blog-header">
                <h1 class="blog-title">UPI Just Got an Update: Here's What Changed on August 1st, 2025</h1>
                <div class="blog-meta">
                    <div class="meta-item">
                        <svg class="meta-icon" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Published: August 01, 2025
                    </div>
                    <div class="meta-item">
                        <svg class="meta-icon" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        UPI
                    </div>
                    <div class="meta-item">
                        <svg class="meta-icon" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        Gautam mer
                    </div>
                    <div class="meta-item">
                        <svg class="meta-icon" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        5 min read
                    </div>
                </div>
            </header>

            <section id="introduction" class="section">
                <h2>Introduction</h2>
                <p>The Unified Payments Interface (UPI) is a marvel of financial technology, processing billions of transactions every month. This incredible volume puts immense pressure on the backend servers of banks and the NPCI. To ensure the system remains fast, stable, and reliable for every user, the NPCI has implemented four technical but crucial changes effective August 1st, 2025. These new rules are designed to optimize traffic and reduce unnecessary load on the system. Here’s what you need to know about these performance-focused updates.</p>
            </section>

            <section id="Capping-Daily-Balance-Checks" class="section">
                <h2>Capping Daily Balance Checks</h2>
                <p>A common habit for many users is to check their bank balance frequently, often before and after every single transaction. While seemingly harmless, these millions of "balance check" requests create significant server traffic. To manage this, the NPCI has introduced a new limit:</p>
                <div class="highlight-box">
                    "You can now check your bank balance a maximum of 50 times per day, per UPI app."
                </div>
                <p>To make this less of an inconvenience, banks are now also required to include your updated available balance in the confirmation SMS you receive after every successful transaction. This change encourages users to rely on transaction alerts rather than repeatedly pinging the server.</p>
            </section>

            <section id="Limiting-Linked-Account-Enquiries" class="section">
                <h2>Limiting Linked Account Enquiries</h2>
                <p>For users who have multiple bank accounts linked to a single UPI app, there's a new, stricter limit on a specific type of query. This refers to the "List Account" API, which fetches the list of all bank accounts associated with your mobile number.</p>
                <div class="highlight-box">
                    "Users can now perform this "linked bank account" check a maximum of 25 times per day, per app."
                </div>
                <p>This rule targets the reduction of redundant API calls that occur when users repeatedly refresh the list of their connected accounts, further preserving server resources for core transaction processing.</p>
             </section>

            <section id="Smart-Scheduling-for-Autopay-Mandates" class="section">
                <h2>Smart Scheduling for Autopay Mandates</h2>
                <p>UPI Autopay is incredibly convenient for handling recurring payments like subscriptions, EMIs, and bills. However, these automated payments often trigger simultaneously, causing massive load spikes during peak business hours. To fix this, Autopay transactions will now be executed in a more controlled manner.</p>
                <div class="highlight-box">
                    "Autopay mandates will now be processed only during designated non-peak hours" <br>
                    (e.g., before 10 AM, between 1 PM - 5 PM, and after 9:30 PM).
                </div>
                <p>This smart scheduling spreads the load of automated debits, ensuring that the system remains fluid and responsive for user-initiated payments throughout the day.</p>   
          </section>
          <section id="Throttling-Transaction-Status-Checks" class="section">
            <h2>Throttling Transaction Status Checks</h2>
            <p>We've all been there: a transaction is "pending," and we anxiously hit the "refresh status" button over and over. This behaviour, when multiplied by millions of users, can flood the system with status requests. The new rule addresses this directly:</p>
            <div class="highlight-box">
                "Users are now limited to checking the status of a single transaction only three times."
            </div>
            <div class="highlight-box">
                "There is a mandatory waiting period of 90 seconds between each status check attempt."
            </div>
            <p>This "cool-down" period prevents users from overwhelming the network with repetitive queries for a transaction that is already being processed, allowing the system to resolve the status and send an automated update more efficiently.</p>
          </section>
          <section id="conclusion" class="section">
                <h2>Conclusion</h2>
                <p>While they may seem like minor restrictions, these four changes are vital for the long-term health and stability of the UPI network. By capping high-frequency, low-value requests and intelligently scheduling automated tasks, the NPCI is ensuring that the UPI platform can continue to scale and provide a seamless, high-speed payment experience for all of India. These are the necessary tweaks under the hood to keep the engine of digital India running smoothly.</p>
            </section> 
        </main>
    </div>