public with sharing class AccountManager {
	@AuraEnabled(cacheable = true) public static List<Account> getAccounts() {
		return [Select Id, Name, Phone, Type, AnnualRevenue from Account limit 10];
	}
	public AccountManager() {

	}
}