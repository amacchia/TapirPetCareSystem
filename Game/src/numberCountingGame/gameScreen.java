package numberCountingGame;

import java.awt.EventQueue;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.Font;

public class gameScreen {

	private JFrame frame;
	private int score;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					gameScreen window = new gameScreen(0);
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public gameScreen(int currentScore) {
		initialize();
		score = currentScore;
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setFont(null);
		frame.getContentPane().setFont(new Font("Tahoma", Font.PLAIN, 16));
		frame.setBounds(100, 100, 450, 300);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		
		JLabel lblHangman = new JLabel("Number Guessing Game");
		lblHangman.setFont(new Font("Tahoma", Font.PLAIN, 20));
		lblHangman.setBounds(111, 65, 238, 40);
		frame.getContentPane().add(lblHangman);
		
		JButton btnPlay = new JButton("Play");
		btnPlay.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				new game(score);
				frame.dispose();
			}
		});
		btnPlay.setBounds(166, 152, 89, 23);
		frame.getContentPane().add(btnPlay);
		
		JButton btnCredits = new JButton("Credits");
		btnCredits.setBounds(166, 200, 89, 23);
		frame.getContentPane().add(btnCredits);
	}
}
