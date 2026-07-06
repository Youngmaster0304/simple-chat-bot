/**
 * RoboRule - Application Logic Script
 * Coordinates chatbot state, live path visualization, code generation, and terminal emulation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Application State ---
    const state = {
        // Predefined base rules
        rules: [
            {
                id: 'exit',
                type: 'exit',
                condition: 'input in ["exit", "quit", "bye", "goodbye"]',
                keywords: ['exit', 'quit', 'bye', 'goodbye'],
                response: 'Goodbye! Have a wonderful day! 👋',
                nodeId: 'node-dec-exit',
                isSystem: true
            },
            {
                id: 'greeting',
                type: 'greeting',
                condition: 'input in ["hello", "hi", "hey", "hola", "greetings"]',
                keywords: ['hello', 'hi', 'hey', 'hola', 'greetings'],
                response: 'Hello there! I am a simple rule-based AI chatbot. How can I help you today? 🤖',
                nodeId: 'node-dec-greeting',
                isSystem: true
            },
            {
                id: 'identity',
                type: 'identity',
                condition: '"your name" in input or "who are you" in input',
                keywords: ['your name', 'who are you'],
                response: 'I am RoboRule, a chatbot built using Python control flow! 💻',
                nodeId: 'node-dec-identity',
                isSystem: true
            },
            {
                id: 'state',
                type: 'state',
                condition: '"how are you" in input or "how is it going" in input',
                keywords: ['how are you', 'how is it going'],
                response: "I'm doing great, thank you for asking! Just running loops and checking conditions. How about you?",
                nodeId: 'node-dec-state',
                isSystem: true
            },
            {
                id: 'help',
                type: 'help',
                condition: 'input in ["help", "what can you do", "features"]',
                keywords: ['help', 'what can you do', 'features'],
                response: "I can answer simple questions! Try asking me:\n- My name ('Who are you?')\n- How I am doing ('How are you?')\n- Or send a greeting ('Hi') or exit ('bye')",
                nodeId: 'node-dec-help',
                isSystem: true
            }
        ],
        // Custom rules added by user
        customRules: []
    };

    // --- DOM Elements ---
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatHistory = document.getElementById('chat-history');
    const clearChatBtn = document.getElementById('clear-chat-btn');
    const terminalBody = document.getElementById('terminal-body');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const rulesList = document.getElementById('rules-list');
    const addRuleBtn = document.getElementById('add-rule-btn');
    const ruleKeywordsInput = document.getElementById('rule-keywords');
    const ruleResponseInput = document.getElementById('rule-response');
    const pythonCodeContent = document.getElementById('python-code-content');
    const copyCodeBtn = document.getElementById('copy-code-btn');

    // Values in decision tree
    const valRaw = document.getElementById('val-raw');
    const valNormalized = document.getElementById('val-normalized');
    const matchNodeVal = document.getElementById('match-node-val');
    const customNode = document.getElementById('node-dec-custom');
    const customConditionText = document.getElementById('custom-condition-text');

    // --- Tab Navigation Setup ---
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.add('hidden'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });

    // --- Dynamic Code Generation ---
    function generatePythonCode() {
        let code = `#!/usr/bin/env python3
"""
Project 1: Rule-Based AI Chatbot 🤖 (Dynamic Code)
"""

def get_bot_response(user_input):
    # Normalize user input by converting to lowercase, removing BOM, and stripping extra spaces
    cleaned_input = user_input.replace('\\ufeff', '').strip().lower()

    # 1. Handle Exit Commands
    if cleaned_input in ${JSON.stringify(state.rules[0].keywords)}:
        return "${state.rules[0].response}", True

    # 2. Handle Greetings
    elif cleaned_input in ${JSON.stringify(state.rules[1].keywords)}:
        return "${state.rules[1].response}", False

    # 3. Handle Identity / Name queries
    elif any(keyword in cleaned_input for keyword in ${JSON.stringify(state.rules[2].keywords)}):
        return "${state.rules[2].response}", False

    # 4. Handle State / Condition queries
    elif any(keyword in cleaned_input for keyword in ${JSON.stringify(state.rules[3].keywords)}):
        return "${state.rules[3].response}", False

    # 5. Handle capabilities / help requests
    elif cleaned_input in ${JSON.stringify(state.rules[4].keywords)}:
        return "${state.rules[4].response.replace(/\n/g, '\\n')}", False
`;

        // Add custom rules if they exist
        state.customRules.forEach((rule, idx) => {
            const keywordsStr = JSON.stringify(rule.keywords);
            code += `
    # Custom Rule #${idx + 1}
    elif any(kw in cleaned_input for kw in ${keywordsStr}):
        return "${rule.response.replace(/"/g, '\\"')}", False`;
        });

        // Add fallback
        code += `

    # Fallback Response (if no rules are matched)
    else:
        return "I'm sorry, I don't understand that. 😕 Type 'help' to see what I can do!", False
`;
        pythonCodeContent.textContent = code;
    }

    // --- Rules Management ---
    function renderRulesList() {
        rulesList.innerHTML = '';
        
        // Render system rules first
        state.rules.forEach(rule => {
            const item = document.createElement('div');
            item.className = 'rule-item';
            
            let keywordTags = rule.keywords.map(kw => `<span class="tag-badge">${kw}</span>`).join(' ');
            
            item.innerHTML = `
                <div class="rule-item-content">
                    <div class="rule-item-keywords">${keywordTags}</div>
                    <div class="rule-item-response" title="${rule.response}">${rule.response}</div>
                </div>
                <div class="rule-item-actions">
                    <span class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-muted); border: none;">System</span>
                </div>
            `;
            rulesList.appendChild(item);
        });

        // Render custom rules
        state.customRules.forEach((rule, index) => {
            const item = document.createElement('div');
            item.className = 'rule-item';
            
            let keywordTags = rule.keywords.map(kw => `<span class="tag-badge">${kw}</span>`).join(' ');
            
            item.innerHTML = `
                <div class="rule-item-content">
                    <div class="rule-item-keywords">${keywordTags}</div>
                    <div class="rule-item-response" title="${rule.response}">${rule.response}</div>
                </div>
                <div class="rule-item-actions">
                    <button class="delete-rule-btn" data-index="${index}" title="Delete Custom Rule">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            `;
            rulesList.appendChild(item);
        });

        // Setup delete button events
        document.querySelectorAll('.delete-rule-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(btn.getAttribute('data-index'));
                state.customRules.splice(index, 1);
                
                // Hide custom node in flowchart if no custom rules exist
                if (state.customRules.length === 0) {
                    customNode.style.display = 'none';
                } else {
                    updateCustomNodeLabel();
                }

                renderRulesList();
                generatePythonCode();
            });
        });
    }

    function updateCustomNodeLabel() {
        if (state.customRules.length > 0) {
            customNode.style.display = 'flex';
            const allKws = state.customRules.flatMap(r => r.keywords).join(', ');
            customConditionText.textContent = `elif matches [${allKws.substring(0, 25)}${allKws.length > 25 ? '...' : ''}]`;
        }
    }

    // Add new rule
    addRuleBtn.addEventListener('click', () => {
        const keywordsRaw = ruleKeywordsInput.value.trim();
        const response = ruleResponseInput.value.trim();

        if (!keywordsRaw || !response) {
            alert('Please fill out both keywords and response fields.');
            return;
        }

        // Split keywords by comma, lowercase and trim
        const keywords = keywordsRaw.split(',').map(kw => kw.trim().toLowerCase()).filter(kw => kw.length > 0);

        if (keywords.length === 0) {
            alert('Please enter at least one valid keyword.');
            return;
        }

        const newRule = {
            id: `custom_${Date.now()}`,
            type: 'custom',
            keywords: keywords,
            response: response,
            nodeId: 'node-dec-custom',
            isSystem: false
        };

        state.customRules.push(newRule);
        
        // Reset forms
        ruleKeywordsInput.value = '';
        ruleResponseInput.value = '';

        updateCustomNodeLabel();
        renderRulesList();
        generatePythonCode();
    });

    // --- Clipboard Utility ---
    copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(pythonCodeContent.textContent)
            .then(() => {
                const icon = copyCodeBtn.querySelector('i');
                icon.className = 'fa-solid fa-check text-green';
                setTimeout(() => {
                    icon.className = 'fa-regular fa-copy';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    });

    // --- Chat Logic & Visual Tree Simulation ---
    function appendMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const time = new Date();
        const timeStr = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;

        messageDiv.innerHTML = `
            <div class="message-content">${text.replace(/\n/g, '<br>')}</div>
            <div class="message-time">${timeStr}</div>
        `;
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function appendTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message bot-message typing-indicator-container';
        indicator.innerHTML = `
            <div class="message-content typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        chatHistory.appendChild(indicator);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return indicator;
    }

    function appendTerminalLine(text, type = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.innerHTML = text;
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Helper to add async delays for visual effect
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Reset flowchart highlighting
    function resetTreeHighlight() {
        const elements = document.querySelectorAll('.flow-node, .flow-arrow');
        elements.forEach(el => {
            el.classList.remove('active-eval', 'active-match');
        });
        matchNodeVal.textContent = 'None';
        matchNodeVal.style.color = 'var(--text-dark)';
    }

    // Process a message and animate the evaluation flow
    async function processMessage(userMessage) {
        // 1. Reset flowchart UI
        resetTreeHighlight();
        valRaw.textContent = `"${userMessage}"`;

        // 2. Animate raw input node
        const nodeStart = document.getElementById('node-start');
        nodeStart.classList.add('active-eval');
        await sleep(350);

        // 3. Normalization Node
        const cleaned = userMessage.trim().toLowerCase();
        valNormalized.textContent = `"${cleaned}"`;
        const nodeNormalize = document.getElementById('node-normalize');
        nodeNormalize.classList.add('active-eval');
        document.querySelector('.node-start + .flow-arrow').classList.add('active-eval');
        await sleep(350);

        // Turn previous indicator elements into matched path styles (so they stay glowing along the path)
        nodeStart.classList.remove('active-eval');
        nodeStart.classList.add('active-match');
        nodeNormalize.classList.remove('active-eval');
        nodeNormalize.classList.add('active-match');
        document.querySelector('.node-start + .flow-arrow').classList.remove('active-eval');
        document.querySelector('.node-start + .flow-arrow').classList.add('active-match');

        // Append terminal line for input
        appendTerminalLine(`<span class="prompt">You:</span> ${userMessage}`);

        // Setup variables for tracking evaluation path
        let matchedRule = null;
        let evaluationDelay = 300;

        // Visual nodes mapping in order of checks
        const orderOfChecks = [
            { id: 'exit', elementId: 'node-dec-exit', check: (c) => state.rules[0].keywords.includes(c) },
            { id: 'greeting', elementId: 'node-dec-greeting', check: (c) => state.rules[1].keywords.includes(c) },
            { id: 'identity', elementId: 'node-dec-identity', check: (c) => state.rules[2].keywords.some(kw => c.includes(kw)) },
            { id: 'state', elementId: 'node-dec-state', check: (c) => state.rules[3].keywords.some(kw => c.includes(kw)) },
            { id: 'help', elementId: 'node-dec-help', check: (c) => state.rules[4].keywords.includes(c) }
        ];

        // Add custom rules check if there are custom rules
        if (state.customRules.length > 0) {
            orderOfChecks.push({
                id: 'custom',
                elementId: 'node-dec-custom',
                check: (c) => {
                    // Check custom rules
                    for (let rule of state.customRules) {
                        if (rule.keywords.some(kw => c.includes(kw))) {
                            matchedRule = rule; // Store which exact custom rule matched
                            return true;
                        }
                    }
                    return false;
                }
            });
        }

        // Add fallback as last check
        const fallbackCheck = { id: 'fallback', elementId: 'node-fallback' };

        // 4. Evaluate decision chain step-by-step
        let currentArrow = document.querySelector('#node-normalize + .flow-arrow');
        
        for (let i = 0; i < orderOfChecks.length; i++) {
            const checkItem = orderOfChecks[i];
            const nodeEl = document.getElementById(checkItem.elementId);
            
            if (currentArrow) {
                currentArrow.classList.add('active-eval');
            }
            nodeEl.classList.add('active-eval');
            
            await sleep(evaluationDelay);

            // Run condition check
            const isMatch = checkItem.check(cleaned);

            if (isMatch) {
                // If it matches, turn this node green
                nodeEl.classList.remove('active-eval');
                nodeEl.classList.add('active-match');
                
                if (currentArrow) {
                    currentArrow.classList.remove('active-eval');
                    currentArrow.classList.add('active-match');
                }

                // If checkItem was custom, matchedRule was already assigned in the custom check callback
                if (checkItem.id !== 'custom') {
                    matchedRule = state.rules.find(r => r.id === checkItem.id);
                }
                break;
            } else {
                // If it fails, keep moving. Highlight as evaluated (not matching, so no glow, just light dim)
                nodeEl.classList.remove('active-eval');
                nodeEl.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                
                if (currentArrow) {
                    currentArrow.classList.remove('active-eval');
                }
                
                // Find next arrow in the flow
                const nextSibling = nodeEl.nextElementSibling;
                if (nextSibling && nextSibling.classList.contains('flow-arrow')) {
                    currentArrow = nextSibling;
                } else {
                    currentArrow = null;
                }
            }
        }

        // If no match was found, highlight fallback node
        if (!matchedRule) {
            const nodeFallback = document.getElementById('node-fallback');
            nodeFallback.classList.add('active-match');
            
            // Set match text
            matchNodeVal.textContent = 'Else (Fallback)';
            matchNodeVal.style.color = 'var(--color-danger)';
            
            const response = "I'm sorry, I don't understand that. 😕\nSince I am a basic rule-based chatbot, I only respond to specific keywords.\nType 'help' to see what I can do!";
            
            const typingIndicator = appendTypingIndicator();
            await sleep(600);
            typingIndicator.remove();
            
            appendMessage(response, false);
            appendTerminalLine(`<span class="prompt">Bot:</span> ${response}`, 'text-yellow');
        } else {
            // Set match text
            matchNodeVal.textContent = matchedRule.id.startsWith('custom') ? 'Custom Match' : `${matchedRule.id.toUpperCase()} Match`;
            matchNodeVal.style.color = 'var(--color-success)';

            const response = matchedRule.response;
            
            const typingIndicator = appendTypingIndicator();
            await sleep(600);
            typingIndicator.remove();

            appendMessage(response, false);
            
            // Highlight exit condition action
            if (matchedRule.id === 'exit') {
                appendTerminalLine(`<span class="prompt">Bot:</span> ${response}`, 'text-yellow');
                await sleep(500);
                appendTerminalLine(`\nProcess finished with exit code 0`, 'text-dark');
            } else {
                appendTerminalLine(`<span class="prompt">Bot:</span> ${response}`);
            }
        }
    }

    // --- Chat Form Submission ---
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        // Clear input
        chatInput.value = '';

        // Append user message
        appendMessage(messageText, true);

        // Run matching simulator
        processMessage(messageText);
    });

    // --- Clear Chat Button ---
    clearChatBtn.addEventListener('click', () => {
        chatHistory.innerHTML = `
            <div class="message system-message">
                <p>Chat cleared. Send a message to run a new evaluation path.</p>
            </div>
        `;
        terminalBody.innerHTML = `
            <div class="terminal-line"><span class="prompt">$</span> python chatbot.py</div>
            <div class="terminal-line text-yellow">============================================================</div>
            <div class="terminal-line text-yellow">🤖 Welcome to the Rule-Based AI Chatbot (RoboRule) 🤖</div>
            <div class="terminal-line text-yellow">Type 'help' to see my commands, or 'exit'/'bye' to leave.</div>
            <div class="terminal-line text-yellow">============================================================</div>
        `;
        resetTreeHighlight();
        valRaw.textContent = `"-"`;
        valNormalized.textContent = `"-"`;
    });

    // --- Initialize ---
    renderRulesList();
    generatePythonCode();
});
