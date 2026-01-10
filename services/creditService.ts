/**
 * Credit Management Service
 * 
 * Manages credit consumption for article generation and operations.
 * Currently client-side only - will integrate with backend in future.
 */

interface CreditConfig {
  annualLimit: number;
  articleGenerationCost: number;
  multiChannelDistributionCost: number;
}

interface CreditUsage {
  remaining: number;
  used: number;
  total: number;
  lastUpdated: Date;
}

const DEFAULT_CONFIG: CreditConfig = {
  annualLimit: 180,
  articleGenerationCost: 1,
  multiChannelDistributionCost: 0, // Distribution itself doesn't consume credits
};

class CreditService {
  private storageKey = 'elevare_credits';
  private config: CreditConfig;

  constructor() {
    this.config = DEFAULT_CONFIG;
    this.initialize();
  }

  /**
   * Initialize credit system with default values if not exists
   */
  private initialize(): void {
    const stored = this.getStoredUsage();
    if (!stored) {
      this.resetCredits();
    }
  }

  /**
   * Get stored credit usage from localStorage
   */
  private getStoredUsage(): CreditUsage | null {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const usage = JSON.parse(stored);
        usage.lastUpdated = new Date(usage.lastUpdated);
        return usage;
      }
    } catch (error) {
      console.error('Erro ao carregar créditos:', error);
    }
    return null;
  }

  /**
   * Save credit usage to localStorage
   */
  private saveUsage(usage: CreditUsage): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(usage));
    } catch (error) {
      console.error('Erro ao salvar créditos:', error);
    }
  }

  /**
   * Get current credit status
   */
  getCredits(): CreditUsage {
    const usage = this.getStoredUsage();
    return usage || {
      remaining: this.config.annualLimit,
      used: 0,
      total: this.config.annualLimit,
      lastUpdated: new Date()
    };
  }

  /**
   * Consume credits for an operation
   */
  consumeCredits(amount: number, operation: string): boolean {
    const usage = this.getCredits();
    
    if (usage.remaining < amount) {
      console.warn(`Créditos insuficientes. Necessário: ${amount}, Disponível: ${usage.remaining}`);
      return false;
    }

    usage.remaining -= amount;
    usage.used += amount;
    usage.lastUpdated = new Date();
    
    this.saveUsage(usage);
    
    console.log(`✓ ${amount} crédito(s) consumido(s) - ${operation}`);
    return true;
  }

  /**
   * Check if user has enough credits
   */
  hasEnoughCredits(amount: number): boolean {
    const usage = this.getCredits();
    return usage.remaining >= amount;
  }

  /**
   * Consume credits for article generation
   */
  consumeForArticleGeneration(): boolean {
    return this.consumeCredits(
      this.config.articleGenerationCost,
      'Geração de artigo'
    );
  }

  /**
   * Get credit cost for an operation
   */
  getCost(operation: 'generation' | 'distribution'): number {
    switch (operation) {
      case 'generation':
        return this.config.articleGenerationCost;
      case 'distribution':
        return this.config.multiChannelDistributionCost;
      default:
        return 0;
    }
  }

  /**
   * Reset credits to initial value (admin/dev use)
   */
  resetCredits(): void {
    const usage: CreditUsage = {
      remaining: this.config.annualLimit,
      used: 0,
      total: this.config.annualLimit,
      lastUpdated: new Date()
    };
    this.saveUsage(usage);
  }

  /**
   * Add credits (for testing or admin use)
   */
  addCredits(amount: number): void {
    const usage = this.getCredits();
    usage.remaining += amount;
    usage.total += amount;
    usage.lastUpdated = new Date();
    this.saveUsage(usage);
  }

  /**
   * Get credit consumption history summary
   */
  getSummary(): {
    remaining: number;
    used: number;
    total: number;
    percentageUsed: number;
    daysUntilReset: number; // Placeholder for annual reset
  } {
    const usage = this.getCredits();
    const percentageUsed = (usage.used / usage.total) * 100;
    
    // Calculate days until reset (365 days from lastUpdated)
    const resetDate = new Date(usage.lastUpdated);
    resetDate.setFullYear(resetDate.getFullYear() + 1);
    const now = new Date();
    const daysUntilReset = Math.ceil((resetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      remaining: usage.remaining,
      used: usage.used,
      total: usage.total,
      percentageUsed: Math.round(percentageUsed),
      daysUntilReset: Math.max(0, daysUntilReset)
    };
  }
}

// Export singleton instance
const creditService = new CreditService();
export default creditService;
