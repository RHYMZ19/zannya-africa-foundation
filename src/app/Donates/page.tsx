'use client';

import { useState } from 'react';
import styles from './Donates.module.css';

export default function Donates() {
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const presetAmounts = [10000, 25000, 50000, 100000];

  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setMessage('Processing donation...');

    // 🔥 Replace this with your backend (Pesapal later)
    setTimeout(() => {
      setLoading(false);
      setMessage('✅ Donation successful! Thank you ❤️');
    }, 2000);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* LEFT SIDE */}
        <div className={styles.info}>
          <h1>Support Our Cause ❤️</h1>
          <p>
            Your donation helps transform lives through education,
            health, and empowerment programs.
          </p>

          <div className={styles.impact}>
            <div>
              <h3>500+</h3>
              <span>People Helped</span>
            </div>
            <div>
              <h3>20+</h3>
              <span>Projects Done</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.box}>
          <h2>Make a Donation</h2>

          {/* PRESET AMOUNTS */}
          <div className={styles.amountGrid}>
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                className={`${styles.amountBtn} ${
                  amount === amt ? styles.active : ''
                }`}
                onClick={() => setAmount(amt)}
              >
                {amt.toLocaleString()} UGX
              </button>
            ))}
          </div>

          {/* CUSTOM AMOUNT */}
          <input
            type="number"
            placeholder="Enter custom amount (UGX)"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className={styles.input}
          />

          {/* PAYMENT METHOD */}
          <div className={styles.payment}>
            <label>
              <input type="radio" name="payment" defaultChecked />
              Mobile Money
            </label>
            <label>
              <input type="radio" name="payment" />
              Card
            </label>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleDonate}
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Donate Now'}
          </button>

          {/* MESSAGE */}
          {message && <p className={styles.message}>{message}</p>}
        </div>

      </div>
    </section>
  );
}