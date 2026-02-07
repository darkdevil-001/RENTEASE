import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Trash2, Edit2 } from 'lucide-react';

interface GroupExpense {
  _id: string;
  title?: string;
  totalAmount?: number;
  expenseMonth?: string;
  groupId?: string;
  isPaid?: boolean;
  createdAt?: string;
}

interface GroupExpensesDialogProps {
  groupId: string;
  groupSize: number;
  onClose: () => void;
}

export default function GroupExpensesDialog({ groupId, groupSize, onClose }: GroupExpensesDialogProps) {
  const [expenses, setExpenses] = useState<GroupExpense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    totalAmount: '',
    expenseMonth: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadExpenses();
  }, [groupId]);

  const loadExpenses = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<GroupExpense>('groupexpenses');
    const filtered = result.items.filter(e => e.groupId === groupId);
    setExpenses(filtered);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.totalAmount) return;

    if (editingId) {
      const updated: GroupExpense = {
        _id: editingId,
        title: formData.title,
        totalAmount: parseFloat(formData.totalAmount),
        expenseMonth: formData.expenseMonth,
        groupId,
      };
      setExpenses(expenses.map(e => e._id === editingId ? updated : e));
      await BaseCrudService.update('groupexpenses', updated);
      setEditingId(null);
    } else {
      const newExpense: GroupExpense = {
        _id: crypto.randomUUID(),
        title: formData.title,
        totalAmount: parseFloat(formData.totalAmount),
        expenseMonth: formData.expenseMonth,
        groupId,
        isPaid: false,
        createdAt: new Date().toISOString(),
      };
      setExpenses([newExpense, ...expenses]);
      await BaseCrudService.create('groupexpenses', newExpense);
    }

    setFormData({
      title: '',
      totalAmount: '',
      expenseMonth: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    setExpenses(expenses.filter(e => e._id !== id));
    await BaseCrudService.delete('groupexpenses', id);
  };

  const handleEdit = (expense: GroupExpense) => {
    setFormData({
      title: expense.title || '',
      totalAmount: expense.totalAmount?.toString() || '',
      expenseMonth: expense.expenseMonth || new Date().toISOString().split('T')[0],
    });
    setEditingId(expense._id);
    setShowForm(true);
  };

  const perMemberShare = (amount: number) => (amount / groupSize).toFixed(2);

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background max-w-[56rem] w-full max-h-[90vh] overflow-y-auto border border-grey300">
        <div className="sticky top-0 bg-background border-b border-grey200 p-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl text-foreground uppercase tracking-wide">
            Monthly Expenses & To-Do List
          </h2>
          <button onClick={onClose} className="text-secondary hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <Button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({
                  title: '',
                  totalAmount: '',
                  expenseMonth: new Date().toISOString().split('T')[0],
                });
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {showForm ? 'Cancel' : 'Add Expense'}
            </Button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-8 p-6 bg-grey100 border border-grey300">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="font-paragraph text-sm text-foreground mb-2 block">
                    Title / Description *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-background border-grey300"
                    placeholder="e.g., Rent, Electricity bill, Internet"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalAmount" className="font-paragraph text-sm text-foreground mb-2 block">
                      Total Amount ($) *
                    </Label>
                    <Input
                      id="totalAmount"
                      type="number"
                      required
                      step="0.01"
                      value={formData.totalAmount}
                      onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                      className="bg-background border-grey300"
                      placeholder="Enter amount"
                    />
                  </div>

                  <div>
                    <Label htmlFor="expenseMonth" className="font-paragraph text-sm text-foreground mb-2 block">
                      Month *
                    </Label>
                    <Input
                      id="expenseMonth"
                      type="date"
                      required
                      value={formData.expenseMonth}
                      onChange={(e) => setFormData({ ...formData, expenseMonth: e.target.value })}
                      className="bg-background border-grey300"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {editingId ? 'Update Expense' : 'Add Expense'}
                  </Button>
                </div>
              </div>
            </form>
          )}

          <div>
            <h3 className="font-heading text-lg text-foreground mb-4 uppercase tracking-wide">
              Expenses ({expenses.length})
            </h3>

            {isLoading ? (
              <p className="font-paragraph text-secondary">Loading...</p>
            ) : expenses.length > 0 ? (
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div key={expense._id} className="border border-grey300 p-4 bg-grey100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-heading text-base text-foreground uppercase tracking-wide">
                          {expense.title}
                        </h4>
                        <p className="font-paragraph text-sm text-secondary mt-1">
                          Month: {expense.expenseMonth ? new Date(expense.expenseMonth).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(expense._id)}
                          className="text-destructive hover:text-destructive/80 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-paragraph text-xs text-secondary mb-1">Total Amount</p>
                        <p className="font-heading text-2xl text-primary">
                          ${expense.totalAmount?.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="font-paragraph text-xs text-secondary mb-1">Per Member Share ({groupSize} members)</p>
                        <p className="font-heading text-2xl text-foreground">
                          ${perMemberShare(expense.totalAmount || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="font-paragraph text-secondary">
                  No expenses added yet. Add one to get started!
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-6 border-t border-grey200 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-grey400 text-foreground hover:bg-grey100"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
