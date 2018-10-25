package numberCountingGame;

import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;
import javax.swing.JFrame;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JButton;

public class game {

	private JFrame frame;
	private JTextField guessField;
	private Random rand;
	private int number;
	private int numGuesses;
	private int guess;
	private int score;

	public game(int currentScore) {
		initialize();
		rand = new Random();
		number = rand.nextInt(100);
		numGuesses = 0;
		guess = 0;
		score = currentScore;
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 450, 300);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		
		guessField = new JTextField();
		guessField.setBounds(175, 185, 86, 20);
		frame.getContentPane().add(guessField);
		guessField.setColumns(10);
		
		JLabel lblEnterYourGuess = new JLabel("Enter your guess here");
		lblEnterYourGuess.setBounds(163, 160, 152, 14);
		frame.getContentPane().add(lblEnterYourGuess);
		
		JLabel lblIAmThinking = new JLabel("I am thinking of a number between 1 and 100...");
		lblIAmThinking.setBounds(97, 24, 300, 14);
		frame.getContentPane().add(lblIAmThinking);
		
		JButton btnGuess = new JButton("Guess");
		btnGuess.setBounds(175, 216, 89, 23);
		btnGuess.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				boolean valid = true;
					try {
						guess = Integer.parseInt(guessField.getText());
					} catch(NumberFormatException ex){
						JOptionPane.showMessageDialog(null, "Please enter a number!");
						valid = false;
					} catch(NullPointerException ex) {
						JOptionPane.showMessageDialog(null, "Make sure the box is not empty!");
						valid = false;
				}
				if(valid) {
					numGuesses++;
					switch(numGuesses) {
					case 1: 
						if(guess == number) {
							congratulations();
						} else {
							helper(number, guess);
						}
						break;
					case 2:
						if(guess == number) {
							congratulations();
						} else {
							helper(number, guess);
						}
						break;
					case 3:
						if(guess == number) {
							congratulations();
						} else {
							sorry();
						}
						
					}
				}
			}
		});
		
		frame.getContentPane().add(btnGuess);
		frame.setVisible(true);
	}
	
	public void helper(int number, int guess) {
		if(guess < number) {
			int difference = number - guess;
			while(difference%10 != 0) {
				difference++;
			}
			JOptionPane.showMessageDialog(null, "Close! It's higher, but you're within " + difference + " of the right answer!");
		} else {
			int difference = guess - number;
			while(difference%10 != 0) {
				difference++;
			}
			JOptionPane.showMessageDialog(null, "Close! It's lower, but you're within " + difference + " of the right answer!");
		}
	}
	
	public void congratulations() {
		score = score + 1000;
		int answer = JOptionPane.showConfirmDialog(null, "Congratulations! That's the correct answer! Your score is now " + score + ". Would you like to play again?");
		if(answer == JOptionPane.YES_OPTION) {
			new game(score);
			frame.dispose();
		} else {
			JOptionPane.showMessageDialog(null, "Thanks for playing!");
			frame.dispose();
		}
		new gameScreen(score);
		frame.dispose();
	}
	
	public void sorry() {
		int answer = JOptionPane.showConfirmDialog(null, "Sorry! Better luck next time! Would you like to play again?");
		if(answer == JOptionPane.YES_OPTION) {
			frame.dispose();
			new game(0);
		} else {
			JOptionPane.showMessageDialog(null, "Thanks for playing!");
			frame.dispose();
		}
	}
}
