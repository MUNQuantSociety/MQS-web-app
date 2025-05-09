---
title: Real-Time Algo Trading Bot
author: "MUN Quant Society"
date: "2025-05-07"
tags:
  [
    "Algorithmic Trading",
    "Nasdaq",
    "FinTech",
    "Real-Time Systems",
    "Database Management",
    "Portfolio Management",
  ]
summary: "An overview of our in house system, a real-time algorithmic trading bot designed using FMP data, capable of managing multiple portfolios simultaneously through a centralized data architecture."
---

![Banner](/article-list/our-trader/hero_placeholder.jpg)

![Financial Chart Banner](placeholder_banner_novatrader.jpg) In the fast-paced world of stock trading, speed, precision, and data management are paramount. MQS Trading Bot is an algorithmic trading bot engineered to operate on the Nasdaq exchange in real-time, leveraging a unified data system to execute trades and manage risk efficiently across multiple portfolios.

## What is the MQS Trading Bot?

MQS Trading Bot is a sophisticated software system designed to automate stock trading on the Nasdaq. It utilizes algorithmic strategies to make trading decisions without manual intervention, aiming to capitalize on market opportunities. The core of NovaTrader is its ability to process vast amounts of market data, manage risk parameters, and track profit and loss (PNL) dynamically, all while supporting simultaneous trading activities for up to six distinct investment portfolios.

## How It Works: The Core Architecture

NovaTrader's operational efficiency stems from its centralized database architecture and real-time processing capabilities:

1.  **Centralized Database:** A single, robust database serves as the backbone of the system. This database houses several critical tables:

    - **Market Data Table:** Stores real-time and historical price information for Nasdaq-listed securities.
    - **PNL Table:** Tracks the profit and loss for each trade and portfolio in real-time.
    - **Risk Table:** Contains predefined risk parameters (e.g., maximum drawdown, position limits) for each portfolio and for the system overall.
    - **Orders Table:** Logs all buy and sell orders, their status, and execution details.
    - **Portfolio Table:** Manages the assets and strategies for up to six independent trading portfolios.

2.  **Real-Time Trade Execution:**

    - The bot continuously ingests live market data from Nasdaq leveraging Financial Modelling Prep data.
    - Pre-programmed trading algorithms analyze this data against the strategies defined for each active portfolio.
    - When trading conditions are met, and risk parameters allow, NovaTrader automatically generates and executes trade orders.

3.  **Multi-Portfolio Management:**

    - MQS Trading Bot is designed to operate up to six different trading portfolios concurrently.
    - Each portfolio can have its own unique set of trading strategies, risk limits, and capital allocation, all managed through the central database. This allows for diversified trading approaches to run in parallel.

4.  **Integrated Risk Management:**
    - Before executing any trade, the system cross-references with the risk table to ensure compliance with predefined limits for the specific portfolio and the overall system.
    - Real-time PNL tracking also feeds into risk calculations, allowing for dynamic adjustments or emergency stop-loss triggers.

## Key Features

- **Real-Time Nasdaq Trading:** Direct market access and execution on the Nasdaq.
- **Multi-Portfolio Capability:** Supports up to 6 independent portfolios simultaneously.
- **Centralized Data Hub:** Single database for market data, PNL, risk, and order management ensures data integrity and quick access.
- **Automated Strategy Execution:** Employs algorithmic models to make and execute trading decisions.
- **Dynamic Risk Control:** Integrated risk management module that monitors and enforces limits in real-time.
- **Live PNL Tracking:** Continuous monitoring of portfolio and trade performance.

## Technological Stack (Conceptual)

While specific implementation can vary, a typical stack for such a system might include:

- **Programming Languages:** Python (for strategy development, data analysis), C++ or Java (for low-latency execution engines).
- **Database:** A high-performance SQL (e.g., PostgreSQL with TimescaleDB for time-series data) or NoSQL database.
- **Data Feeds:** Integration with reliable, low-latency Nasdaq data providers.
- **Connectivity:** FIX protocol or proprietary APIs for order execution.

## Challenges and Future Scope

Developing and maintaining a real-time trading bot like NovaTrader involves overcoming challenges such as ensuring system robustness, minimizing latency, and adapting strategies to evolving market conditions.

Future enhancements could include:

- Incorporating more sophisticated machine learning models for predictive trading.
- Expanding to other exchanges.
- Offering more granular risk control features.
- Developing a user-friendly interface for strategy configuration and monitoring.

## Conclusion

MQS Trading Bot represents a streamlined approach to algorithmic trading on the Nasdaq. By centralizing its data management and enabling multi-portfolio operations, it offers a robust platform for executing diverse trading strategies in real-time. Its focus on integrated risk and PNL tracking makes it a potentially powerful tool in the arsenal of modern automated trading systems.
