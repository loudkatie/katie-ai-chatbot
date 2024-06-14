                    document.addEventListener('DOMContentLoaded', () => {
                        document.getElementById('user-input').addEventListener('keypress', function (e) {
                            if (e.key === 'Enter') {
                                sendMessage();
                            }
                        });
                    });

                    async function sendMessage() {
                        const userInput = document.getElementById('user-input');
                        const chatbox = document.getElementById('chatbox');
                        const userMessage = userInput.value.trim();

                        if (userMessage !== '') {
                            // Display user message
                            const userMessageElement = document.createElement('div');
                            userMessageElement.className = 'message user';
                            userMessageElement.innerText = userMessage;
                            chatbox.appendChild(userMessageElement);

                            // Clear input field
                            userInput.value = '';

                            // Fetch bot response
                            console.log("Sending message to bot:", userMessage);
                            const botResponse = await getBotResponse(userMessage);

                            if (botResponse) {
                                // Display bot response
                                const botMessageElement = document.createElement('div');
                                botMessageElement.className = 'message bot';
                                botMessageElement.innerText = botResponse;
                                chatbox.appendChild(botMessageElement);

                                // Scroll to the bottom of the chatbox
                                chatbox.scrollTop = chatbox.scrollHeight;
                            } else {
                                console.log("No response from bot.");
                            }
                        }
                    }

                    async function getBotResponse(message) {
                        try {
                            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer sk-proj-Ze45RQWzmCFszJugtBzVT3BlbkFJL1LP01faxNaFJNFIsZQI`
                                },
                                body: JSON.stringify({
                                    model: 'gpt-4',
                                    messages: [{ role: 'user', content: message }]
                                })
                            });
                            const data = await response.json();
                            console.log("Bot response data:", data);
                            return data.choices[0].message.content;
                        } catch (error) {
                            console.error("Error fetching bot response:", error);
                            return "Error: Unable to fetch response.";
                        }
                    }
