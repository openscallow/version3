<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
    }

    .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 60px 0;
        text-align: center;
        margin-bottom: 40px;
        border-radius: 0 0 20px 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .header h1 {
        font-size: 3rem;
        margin-bottom: 10px;
        font-weight: 700;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .header p {
        font-size: 1.2rem;
        opacity: 0.9;
    }

    .content {
        background: white;
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        margin-bottom: 40px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
    }

    .section {
        margin-bottom: 40px;
        padding: 30px;
        background: linear-gradient(145deg, #f8f9ff, #e8f0ff);
        border-radius: 12px;
        border-left: 5px solid #667eea;
        transition: all 0.3s ease;
    }

    .section:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }

    .section h2 {
        color: #667eea;
        font-size: 2rem;
        margin-bottom: 20px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .section h3 {
        color: #764ba2;
        font-size: 1.5rem;
        margin: 25px 0 15px 0;
        font-weight: 500;
    }

    .section p {
        font-size: 1.1rem;
        margin-bottom: 15px;
        text-align: justify;
    }

    .highlight {
        background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
        border: 2px solid rgba(255,255,255,0.5);
    }

    .data-list {
        background: #f0f8ff;
        padding: 20px;
        border-radius: 10px;
        border: 2px solid #e6f3ff;
        margin: 20px 0;
    }

    .data-list ul {
        list-style: none;
        padding-left: 0;
    }

    .data-list li {
        padding: 8px 0;
        padding-left: 25px;
        position: relative;
        font-size: 1.1rem;
    }

    .data-list li:before {
        content: "📋";
        position: absolute;
        left: 0;
    }

    .contact-info {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        margin-top: 40px;
    }

    .last-updated {
        text-align: center;
        color: #666;
        font-style: italic;
        margin-top: 30px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 10px;
    }

    .icon {
        font-size: 1.5rem;
        margin-right: 10px;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .section {
        animation: fadeIn 0.6s ease-out;
    }

    .section:nth-child(2) { animation-delay: 0.1s; }
    .section:nth-child(3) { animation-delay: 0.2s; }
    .section:nth-child(4) { animation-delay: 0.3s; }
    .section:nth-child(5) { animation-delay: 0.4s; }

    @media (max-width: 768px) {
        .container {
            padding: 0 15px;
        }
        
        .header h1 {
            font-size: 2rem;
        }
        
        .content {
            padding: 20px;
        }
        
        .section {
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .section h2 {
            font-size: 1.5rem;
        }
    }
</style>

<div class="container">
    <div class="header">
        <h1>Privacy Policy</h1>
        <p>Your privacy matters to us - learn how we protect your information</p>
    </div>

    <div class="content">
        <div class="section">
            <h2><span class="icon">🛡️</span>Our Commitment to Your Privacy</h2>
            <p>We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.</p>
            
            <div class="highlight">
                <strong>Key Promise:</strong> We do not share your personal information with any third parties. Your data stays secure with us.
            </div>
        </div>

        <div class="section">
            <h2><span class="icon">📊</span>Information We Collect</h2>
            <p>We collect minimal information necessary to provide our services effectively. When you intend to purchase a product on our website, we may collect:</p>
            
            <div class="data-list">
                <ul>
                    <li><strong>Phone Number</strong> - To contact you regarding your order and provide customer support</li>
                    <li><strong>Full Name</strong> - To process your order and personalize your experience</li>
                    <li><strong>School Name</strong> - To better understand our customer base and tailor our services</li>
                </ul>
            </div>
            
            <p>This information is collected only when you actively provide it during the purchase process or when expressing intent to buy our products.</p>
        </div>

        <div class="section">
            <h2><span class="icon">🎯</span>How We Use Your Information</h2>
            <p>The information we collect serves specific purposes related to improving your experience:</p>
            
            <h3>Order Processing & Communication</h3>
            <p>Your phone number and name allow us to process orders efficiently and communicate important updates about your purchases.</p>
            
            <h3>Service Improvement</h3>
            <p>School information helps us understand our customer demographics and improve our products and services accordingly.</p>
            
            <h3>Customer Support</h3>
            <p>We use your contact information to provide assistance and resolve any issues you may encounter.</p>
        </div>

        <div class="section">
            <h2><span class="icon">🔒</span>Data Protection & Security</h2>
            <p>We implement robust security measures to protect your personal information:</p>
            
            <div class="highlight">
                <strong>No Third-Party Sharing:</strong> We never sell, rent, or share your personal information with third parties for marketing or any other purposes.
            </div>
            
            <p>Your data is stored securely using industry-standard encryption and security protocols. Access to your information is strictly limited to authorized personnel who need it to provide our services.</p>
        </div>

        <div class="section">
            <h2><span class="icon">📞</span>Your Rights & Contact Information</h2>
            <p>You have the right to:</p>
            <div class="data-list">
                <ul>
                    <li>Request access to your personal information</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Withdraw consent for data processing</li>
                </ul>
            </div>
            
            <div class="contact-info">
                <h3>Questions about this policy?</h3>
                <p>If you have any questions or concerns about our privacy practices, please contact us. We're here to help and ensure your privacy is protected.</p>
            </div>
        </div>

        <div class="last-updated">
            <p>This Privacy Policy was last updated on <strong>August 15, 2025</strong></p>
            <p>We may update this policy from time to time. Any changes will be posted on this page.</p>
        </div>
    </div>
</div>