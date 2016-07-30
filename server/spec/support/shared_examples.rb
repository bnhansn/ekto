RSpec.shared_examples 'a paranoid model' do
  it { should respond_to(:deleted_at) }

  it 'adds a deleted_at where clause' do
    expect(described_class.all.where_sql).to include('"deleted_at" IS NULL')
  end

  it 'skips adding the deleted_at where clause when unscoped' do
    expect(described_class.unscoped.where_sql.to_s).not_to include('deleted_at')
  end
end
