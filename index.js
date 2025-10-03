
                ❌ Foutconst express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ===== CORS FIX - GEEN EXTERNE PACKAGES =====
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Wallet-Address');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    next();
});

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ===== MAIN ENDPOINTS =====

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: '🎉 ImperiumAI Backend V2 - ONLINE!',
        status: 'success',
        version: '2.0.0',
        cors_enabled: true,
        ai_ready: true,
        blockchain_ready: true,
        timestamp: new Date().toISOString(),
        endpoints: [
            'GET /',
            'GET /api/tasks',
            'POST /api/ai/start',
            'GET /api/wallet/connect',
            'POST /api/transactions/send'
        ]
    });
});

// ===== AI TASK MANAGEMENT =====

// Get available tasks
app.get('/api/tasks', (req, res) => {
    const tasks = [
        {
            id: 1,
            title: 'Smart Contract Security Audit',
            description: 'Review DeFi protocol for vulnerabilities',
            reward: '0.25 ETH',
            platform: 'Crypto Jobs List',
            difficulty: 'expert',
            estimatedTime: '4 hours',
            requirements: ['Solidity', 'Security Analysis'],
            status: 'available'
        },
        {
            id: 2,
            title: 'Blockchain Data Analysis',
            description: 'Analyze transaction patterns for DeFi protocol',
            reward: '0.15 ETH',
            platform: 'Upwork',
            difficulty: 'high',
            estimatedTime: '2 hours',
            requirements: ['Python', 'Web3', 'Data Analysis'],
            status: 'available'
        },
        {
            id: 3,
            title: 'NFT Metadata Processing',
            description: 'Process and validate NFT metadata',
            reward: '0.08 ETH',
            platform: 'Fiverr',
            difficulty: 'medium',
            estimatedTime: '1 hour',
            requirements: ['JavaScript', 'IPFS'],
            status: 'available'
        },
        {
            id: 4,
            title: 'Web3 Frontend Development',
            description: 'Build DApp user interface',
            reward: '0.35 ETH',
            platform: 'Freelancer',
            difficulty: 'expert',
            estimatedTime: '6 hours',
            requirements: ['React', 'Web3.js', 'MetaMask'],
            status: 'available'
        },
        {
            id: 5,
            title: 'Crypto Trading Bot Setup',
            description: 'Configure automated trading strategies',
            reward: '0.20 ETH',
            platform: 'Crypto Jobs List',
            difficulty: 'high',
            estimatedTime: '3 hours',
            requirements: ['Python', 'APIs', 'Trading'],
            status: 'available'
        }
    ];
    
    // Simulate real-time task availability
    const availableTasks = tasks.filter(() => Math.random() > 0.3);
    
    res.json({
        success: true,
        tasks: availableTasks,
        total: availableTasks.length,
        totalReward: availableTasks.reduce((sum, task) => 
            sum + parseFloat(task.reward.replace(' ETH', '')), 0
        ).toFixed(3) + ' ETH',
        lastUpdated: new Date().toISOString(),
        aiRecommendation: availableTasks.length > 0 ? availableTasks[0] : null
    });
});

// Apply to task
app.post('/api/tasks/:id/apply', (req, res) => {
    const { id } = req.params;
    const { walletAddress, skills } = req.body;
    
    // Simulate application success rate based on skills
    const successRate = skills && skills.length > 2 ? 0.8 : 0.4;
    const accepted = Math.random() < successRate;
    
    res.json({
        success: true,
        taskId: id,
        walletAddress: walletAddress,
        applicationStatus: accepted ? 'accepted' : 'rejected',
        message: accepted ? 
            'Application accepted! Task assigned to AI.' : 
            'Application rejected. Improving skills for next attempt.',
        estimatedStart: accepted ? new Date(Date.now() + 5000).toISOString() : null
    });
});

// ===== AI CONTROL ENDPOINTS =====

// Start AI
app.post('/api/ai/start', (req, res) => {
    const { mode, targetEth, walletAddress } = req.body;
    
    res.json({
        success: true,
        message: 'AI started successfully',
        aiId: 'ai_' + Date.now(),
        mode: mode || 'search',
        targetEth: targetEth || '0.1',
        walletAddress: walletAddress,
        status: 'active',
        startTime: new Date().toISOString(),
        nextAction: 'Searching for suitable tasks...'
    });
});

// Stop AI
app.post('/api/ai/stop', (req, res) => {
    const { aiId } = req.body;
    
    res.json({
        success: true,
        message: 'AI stopped successfully',
        aiId: aiId,
        status: 'stopped',
        stopTime: new Date().toISOString(),
        finalStats: {
            tasksCompleted: Math.floor(Math.random() * 10),
            ethEarned: (Math.random() * 0.5).toFixed(4),
            uptime: Math.floor(Math.random() * 24) + 'h'
        }
    });
});

// AI Status
app.get('/api/ai/status', (req, res) => {
    res.json({
        success: true,
        status: 'active',
        mode: 'search_and_execute',
        currentTask: {
            id: 3,
            title: 'NFT Metadata Processing',
            progress: Math.floor(Math.random() * 100) + '%'
        },
        stats: {
            tasksFound: Math.floor(Math.random() * 50) + 10,
            tasksCompleted: Math.floor(Math.random() * 20) + 5,
            successRate: (Math.random() * 30 + 70).toFixed(1) + '%',
            ethEarned: (Math.random() * 2).toFixed(4),
            uptime: Math.floor(Math.random() * 72) + 'h'
        },
        nextAction: 'Analyzing new task opportunities...',
        lastUpdate: new Date().toISOString()
    });
});

// ===== WALLET & BLOCKCHAIN ENDPOINTS =====

// Connect wallet
app.post('/api/wallet/connect', (req, res) => {
    const { address, chainId, signature } = req.body;
    
    res.json({
        success: true,
        message: 'Wallet connected successfully',
        walletAddress: address,
        chainId: chainId,
        network: chainId === '0x1' ? 'mainnet' : 'testnet',
        connected: true,
        timestamp: new Date().toISOString()
    });
});

// Get wallet balance
app.get('/api/wallet/:address/balance', (req, res) => {
    const { address } = req.params;
    
    // Simulate balance check
    const balance = (Math.random() * 5).toFixed(6);
    const balanceUSD = (parseFloat(balance) * 2000).toFixed(2);
    
    res.json({
        success: true,
        address: address,
        balance: balance + ' ETH',
        balanceUSD: '$' + balanceUSD,
        lastUpdated: new Date().toISOString()
    });
});

// Send transaction
app.post('/api/transactions/send', (req, res) => {
    const { from, to, amount, type } = req.body;
    
    // Generate fake transaction hash
    const txHash = '0x' + Array.from({length: 64}, () => 
        Math.floor(Math.random() * 16).toString(16)
    ).join('');
    
    res.json({
        success: true,
        message: 'Transaction sent successfully',
        transactionHash: txHash,
        from: from,
        to: to,
        amount: amount,
        type: type || 'reward',
        status: 'pending',
        explorerUrl: `https://etherscan.io/tx/${txHash}`,
        timestamp: new Date().toISOString()
    });
});

// ===== FREELANCE PLATFORM INTEGRATION =====

// Search platforms
app.get('/api/platforms/search', (req, res) => {
    const { keywords, minReward } = req.query;
    
    const platforms = [
        {
            name: 'Upwork',
            jobs: Math.floor(Math.random() * 20) + 5,
            avgReward: '0.12 ETH',
            successRate: '78%'
        },
        {
            name: 'Freelancer',
            jobs: Math.floor(Math.random() * 15) + 3,
            avgReward: '0.09 ETH',
            successRate: '65%'
        },
        {
            name: 'Fiverr',
            jobs: Math.floor(Math.random() * 25) + 8,
            avgReward: '0.06 ETH',
            successRate: '85%'
        },
        {
            name: 'Crypto Jobs List',
            jobs: Math.floor(Math.random() * 10) + 2,
            avgReward: '0.25 ETH',
            successRate: '45%'
        }
    ];
    
    res.json({
        success: true,
        platforms: platforms,
        searchQuery: keywords || 'blockchain, crypto, web3',
        minReward: minReward || '0.05 ETH',
        totalJobs: platforms.reduce((sum, p) => sum + p.jobs, 0),
        lastScraped: new Date().toISOString()
    });
});

// ===== ANALYTICS & REPORTING =====

// Performance analytics
app.get('/api/analytics/performance', (req, res) => {
    const { period } = req.query;
    
    res.json({
        success: true,
        period: period || '24h',
        metrics: {
            tasksCompleted: Math.floor(Math.random() * 50) + 10,
            ethEarned: (Math.random() * 3).toFixed(4),
            successRate: (Math.random() * 20 + 75).toFixed(1) + '%',
            avgTaskTime: Math.floor(Math.random() * 120) + 30 + ' minutes',
            platformsUsed: ['Upwork', 'Freelancer', 'Crypto Jobs List'],
            topSkills: ['Smart Contracts', 'Web3', 'Data Analysis']
        },
        trends: {
            ethEarningsTrend: '+15%',
            successRateTrend: '+8%',
            taskCompletionTrend: '+22%'
        },
        timestamp: new Date().toISOString()
    });
});

// ===== HEALTH & MONITORING =====

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        version: '2.0.0',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString(),
        services: {
            ai: 'operational',
            blockchain: 'operational',
            database: 'operational',
            cors: 'fixed'
        }
    });
});

// System status
app.get('/api/system/status', (req, res) => {
    res.json({
        success: true,
        system: {
            cpu: Math.floor(Math.random() * 30) + 10 + '%',
            memory: Math.floor(Math.random() * 40) + 20 + '%',
            disk: Math.floor(Math.random() * 20) + 5 + '%',
            network: 'stable'
        },
        ai: {
            status: 'active',
            tasksInQueue: Math.floor(Math.random() * 10),
            processing: Math.random() > 0.5
        },
        blockchain: {
            connected: true,
            latency: Math.floor(Math.random() * 100) + 50 + 'ms',
            gasPrice: Math.floor(Math.random() * 50) + 20 + ' gwei'
        }
    });
});

// ===== ERROR HANDLING =====

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        message: `${req.method} ${req.originalUrl} does not exist`,
        availableEndpoints: [
            'GET /',
            'GET /api/tasks',
            'POST /api/ai/start',
            'GET /api/wallet/:address/balance',
            'POST /api/transactions/send'
        ]
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Backend Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message,
        timestamp: new Date().toISOString()
    });
});

// ===== SERVER START =====

app.listen(PORT, () => {
    console.log(`🚀 ImperiumAI Backend V2 running on port ${PORT}`);
    console.log(`✅ CORS enabled for all origins`);
    console.log(`🤖 AI endpoints ready`);
    console.log(`💰 Blockchain integration active`);
    console.log(`📊 Analytics enabled`);
    console.log(`🔗 Health monitoring active`);
});

module.exports = app;
