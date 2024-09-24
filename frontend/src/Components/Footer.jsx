
import  styles from '../styles/Footer.module.css'; // Import CSS for footer styling

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-container']}>
        <div className= {styles[`footer-section`]}>
          <h4>About Us</h4>
          <p>Welcome to our blog where we share insightful articles on various topics. Stay tuned for more updates!</p>
        </div>
        
        <div className={`${styles[`footer-section`]} ${styles.links}`}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        
        <div className={`${styles[`footer-section`]} ${styles.contact}`}>
          <h4>Contact Us</h4>
          <p>Email: info@yourblog.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Blog St, City, Country</p>
        </div>
        
        <div className={`${styles[`footer-section`]} ${styles.social}`}>
          <h4>Follow Us</h4>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      
      <div className={styles[`footer-bottom`]}>
        <p>© 2024 Your Blog Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
